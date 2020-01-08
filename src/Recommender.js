import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import CardColumns from 'react-bootstrap/CardColumns';



class Recommender extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            chips: [],
            likedKeys:[],
            selectedSubjects:[],
            showCourse:[]
        };
    }
    render() {
        return(
            <div>
                <Card style={{width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 40px)', position: 'fixed', borderRadius: '20px'}}>
                    <Card.Body>
                        <Card.Title>Subjects</Card.Title>
                        <ButtonToolbar style={{overflowX:'scroll'}}>
                            <ToggleButtonGroup type="checkbox" style={{flexDirection: 'column'}}>
                                {this.getWordList(this.props.sList)}
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Card.Body>
                </Card>
                <Card style={{width: 'calc(20vw - 5px)', marginLeft: '20vw', height: 'calc(100vh - 40px)', position: 'fixed', borderRadius: '20px'}}>
                    <Card.Body style={{overflowX:'scroll'}}>
                        <Card.Title>Interest Areas</Card.Title>
                        <ButtonToolbar style={{overflowX:'scroll'}}>
                            <ToggleButtonGroup type="checkbox" style={{flexDirection: 'column'}}>
                                {this.getWordList(this.props.iList)}
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Card.Body>
                </Card>
                <div style={{marginLeft: '40vw', height: 'calc(100vh - 40px)', position: 'fixed', borderRadius: '20px'}}>
                    <h2>Recommended Courses</h2>
                    {this.displayCourse()}
                </div>
            </div>
        )
    }

    // all keywords to select from
    getWordList(dataList){
        var temp = [];
        for(const word of dataList){
            temp.push(
                <ToggleButton value = {word}>{word}</ToggleButton>
            )
        }
        return temp;
    }

    // Keywords that are from liked courses
    getLikedWOrds(){
        var tempLiked = this.state.likedKeys;
        for(const course of this.props.rCourses){
            for(const eKey of course.keywords){
                if(tempLiked.indexOf(eKey) === -1){
                    tempLiked.push(eKey);
                }
            }
        }
        console.log(tempLiked);
        this.setState({likedKeys: tempLiked});
    }

    // keywords entered by the user
    getTags(){
        var newSearchList = this.state.chips;
        var tags = [];
        for(const tag of newSearchList){
          console.log(tag);
          tags.push(
              <ListGroup.Item>{tag} <Button variant="primary" onClick={()=>this.removeTag(tag)}>X</Button></ListGroup.Item>
          )
        }
        return tags;
    }

    // remove keywords entered by the user
    removeTag(rTag){
        var newSearchList = this.state.chips;
        for(const tag of newSearchList){
          if(tag === rTag){
            newSearchList.splice(newSearchList.indexOf(tag), 1);
          }
        }
        this.setState({chips: newSearchList})
        this.props.setCourses(this.searchAndFilter.searchAndFilter(this.props.courses, newSearchList, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value, this.state.buttonValue));
    }

    getSubjectOptions() {
        let subjectOptions = [];
        for(const subject of this.props.sList) {
          subjectOptions.push(<option key={subject}>{subject}</option>);
        }
        return subjectOptions;
    }

    displayCourse(){
        var tempCourses = [];
        for(const course of Object.entries(this.props.aCourses)){
            console.log(course);
            tempCourses.push(
                <Card>
                    <Card.Title>{course[1].name}</Card.Title>
                </Card>
            )
        }
        return tempCourses;
    }


}

export default Recommender;