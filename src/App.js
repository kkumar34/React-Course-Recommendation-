import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CartCourse from './CartCourse';
import CompletedCourses from './CompletedCourses';
import Recommender from './Recommender';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      cartCourses: [],
      completedList: [],
      interestList: [],
      ratedCourses:[]
    };
  }

  async componentDidMount() {
    const res = await fetch('https://mysqlcs639.cs.wisc.edu/classes');
    const dataObj = await res.json();
    const sub = this.getSubjects(dataObj);
    this.setState({allCourses: dataObj, filteredCourses: dataObj,
       subjects: sub, 
       interestList: this.setInterestList(dataObj, sub)});

    const res2 = await fetch('https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed')
    const dataObj2 = await res2.json();
    this.setState({completedList: this.getCompletedCourseList(dataObj2)});
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses){
    this.setState({filteredCourses: courses})
  }

  // Start

  rateCourse(course){
    var tempList = this.state.ratedCourses;
    course[1].rating = course[1].rating?false:true;
    if(course[1].rating){
      tempList.push(course);
    }
    else{
      tempList = tempList.filter((tempCourse)=>{
        if(tempCourse[0] === course[0]){
          return 0;
        }
        else{
          return 1;
        }
      });
    }
    this.setState({ratedCourses: tempList})
  }

  setInterestList(data, sub){
    var intList = [];
    var subList = sub;
    for(const course of Object.values(data)){
      for(const keyword of course.keywords){
        if(intList.indexOf(keyword) === -1){
          intList.push(keyword);
        }
      }
    }
    return intList;
  }
  getCompletedCourseList(comCourses){
    let tempCourses = comCourses.data;
    let comList = [];
    for(const [key, course] of Object.entries(this.state.allCourses)) {
      if(tempCourses.indexOf(key) !== -1){
        course.rating = false;
        comList.push([key, course]);
      }
    }
    return comList;
  }

  deleteCourse(name, section, subsection){
    var newCart = this.state.cartCourses;
    if(section === "Not Selected"){
      for(const course of newCart){
        if(course.name === name){
          newCart.splice(newCart.indexOf(course), 1);
        }
      }
    }
    else if(subsection === "Not Selected"){
      for(const course of newCart){
        if(course.section === section){
          newCart.splice(newCart.indexOf(course), 1);
        }
      }
    }
    else{
      for(const course of newCart){
        if(course.subsection === subsection){
          newCart.splice(newCart.indexOf(course), 1);
        }
      }
    }
    this.setState({cartCourses: newCart})
  }

  setCartCourses(name, section, subsection){
    var newCart = this.state.cartCourses;
    var addedCourse = {};
    if(section === ""){
      for(const course of newCart){
        if(course.name === name){
          return;
        }
      }
      addedCourse.name = name;
      addedCourse.section = "Not Selected";
      addedCourse.subsection = "Not Selected";
    }
    else if(subsection === ""){
      for(const course of newCart){
        if(course.section === section){
          return;
        }
      }
      addedCourse.name = name;
      addedCourse.section = section;
      addedCourse.subsection = "Not Selected";
    }
    else{
      for(const course of newCart){
        if(course.subsection === subsection){
          return;
        }
      }
      addedCourse.name = name;
      addedCourse.section = section;
      addedCourse.subsection = subsection;
    }
    this.setState({
      cartCourses: this.state.cartCourses.concat(addedCourse)
    })
  }

  // End

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Tabs>
          <Tab eventKey="home" title="Home">
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects}/>
              <div style={{marginLeft: '20vw'}}>
                <CourseArea data={this.state.filteredCourses} setCartCourses={(name, section, subsection)=>this.setCartCourses(name, section, subsection)}/>
              </div>
          </Tab>
          <Tab eventKey="cart" title="Cart">
            <CartCourse data={this.state.cartCourses} deleteCourse={(name, section, subsection)=>this.deleteCourse(name, section, subsection)}/>
          </Tab>
          <Tab eventKey="coursesCompleted" title="Courses Completed">
            <CompletedCourses data={this.state.completedList} rateCourse={(course)=>this.rateCourse(course)}/>
          </Tab>
          <Tab eventKey="recommender" title="Recommender">
            <Recommender aCourses={this.state.allCourses} iList={this.state.interestList} sList={this.state.subjects} rCourses={this.state.ratedCourses}/>
          </Tab>
        </Tabs>
      </>
    )
  }
}

export default App;
