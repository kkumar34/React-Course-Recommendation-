import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import SearchAndFilter from './SearchAndFilter';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef();
    this.minimumCredits = React.createRef();
    this.maximumCredits = React.createRef();
    this.search = React.createRef();
    this.state = {
      chips: [],
      buttonValue: 2
    };
  }

  setMethod(value){
    var newSearchList = this.state.chips;
    this.setState({buttonValue: value})
    console.log(this.state.buttonValue);
    if(value !== this.state.buttonValue){
      this.props.setCourses(this.searchAndFilter.searchAndFilter(this.props.courses, newSearchList, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value, value));
    }
  }

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
  setCourses() {
    var newSearchList = this.state.chips;
    newSearchList.push(this.search.current.value);
    this.setState({chips: newSearchList})
    this.props.setCourses(this.searchAndFilter.searchAndFilter(this.props.courses, newSearchList, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value, this.state.buttonValue));
  }

  handleCreditsKeyDown(e) {
    if(['0','1','2','3','4','5','6','7','8','9','Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].indexOf(e.key) === -1)
      e.preventDefault();
  }

  handleSearch(e) {
    if(['Enter'].indexOf(e.key) === 0){
      e.preventDefault();
      this.setCourses();
      this.search.current.value = "";
    }
  }

  getSubjectOptions() {
    let subjectOptions = [];

    for(const subject of this.props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  }

  render() {
    return (
      <>
        <Card style={{width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', position: 'fixed'}}>
          <Card.Body>
            <Card.Title>Search and Filter</Card.Title>
            <Form>
              <Form.Group controlId="formKeywords" style={{width: '100%'}} onKeyDown={(e) => this.handleSearch(e)}>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search" autoComplete="off" ref={this.search}/>
              </Form.Group>

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control as="select" ref={this.subject} onClick={() => this.setCourses()}>
                  {this.getSubjectOptions()}
                </Form.Control>
              </Form.Group>

              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Form.Group controlId="minimumCredits" onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Label>Credits</Form.Label>
                  <Form.Control type="text" placeholder="minimum" autoComplete="off" ref={this.minimumCredits}/>
                </Form.Group>
                <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '38px'}}>to</div>
                <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Control type="text" placeholder="maximum" autoComplete="off" ref={this.maximumCredits}/>
                </Form.Group>
              </div>
            </Form>
            <ListGroup>
              <Button onClick={()=> this.setMethod(1)}>Intersection</Button>
              <p></p>
              <Button onClick={()=> this.setMethod(2)}>Union</Button>
            </ListGroup>
            <ListGroup>{this.getTags()}</ListGroup>
          </Card.Body>
        </Card>
      </>
    )
  }

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
}

export default Sidebar;
