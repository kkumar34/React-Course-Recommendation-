import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

class Course extends React.Component {

  render() {
    return (
      <Accordion>
        <Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
            <Card.Body>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <Card.Title>{this.props.data.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{this.props.data.name} - {this.getCredits()}</Card.Subtitle>
            </Accordion.Toggle>
            <Button variant="primary" onClick={()=> this.props.setCartCourses(this.props.data.name, "", "")}>Add</Button>
            </Card.Body>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{this.getSections()}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }

  getSections(){
    var sections = [];
    for(const section of Object.entries(this.props.data.sections)){
      sections.push(
        <Accordion>
        <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
            <Card.Body>
                <Card.Title>{section[0]}</Card.Title>
                <Button variant="primary" onClick={()=> this.props.setCartCourses(this.props.data.name, section[0], "")}>Add</Button>
            </Card.Body>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
          <Card.Body>{this.getSubSections(section)}</Card.Body>
          </Accordion.Collapse>
        </Card>
        </Accordion>
      )
    }
    return sections;
  }

  getSubSections(section){
    var subSections = [];
    for(const subSection of Object.entries(section[1].subsections)){
      subSections.push(
        <Card>
            <Card.Body>
                <Card.Title>{subSection[0]}</Card.Title>
                <Button variant="primary" onClick={()=> this.props.setCartCourses(this.props.data.name, section[0], subSection[0])}>Add</Button>
            </Card.Body>
        </Card>
      )
    }
    if(subSections.length === 0){
      subSections.push(<p>No Subsections!</p>)
    }
    return subSections;
  }


  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }
}

export default Course;
