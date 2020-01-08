import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class CompletedCourses extends React.Component {
    render() {
        return(
            <div>
                {this.courseList(this.props.data)}
            </div>
        )
    }

    courseList(cartData){
        let courses = [];
        for(const [key, course] of cartData){
        courses.push (
            <Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
                <Card.Body>
                    <Card.Title>{course.name} ({course.credits})</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {course.number}</Card.Subtitle>
                    <Button className="btn btn-primary" onClick={() => this.props.rateCourse([key, course])}>
                    {course.rating?"Unlike":"Like"}</Button>
                </Card.Body>
            </Card>
        )
        }
        return courses;
    }
}

export default CompletedCourses;