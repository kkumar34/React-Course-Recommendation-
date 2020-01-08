import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class CartCourse extends React.Component {
    render() {
        return(
            <div>
                {this.cartList(this.props.data)}
            </div>
        )
    }

    cartList(cartData){
        let courses = [];
        for(const course of cartData) {
        courses.push (
            <Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
                <Card.Body>
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    Section: {course.section}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                    Subsection: {course.subsection}</Card.Subtitle>
                    <Button variant="primary" onClick={()=> this.props.deleteCourse(course.name, course.section, course.subsection)}>Remove</Button>
                </Card.Body>
            </Card>
        )
        }
        return courses;
    }
}

export default CartCourse;