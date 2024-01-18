import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "react-bootstrap";
import {
    MDBBtn,
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const EditMenu = (props) => {

    const [soups, setSoups] = useState([]);
    const [mainCourse, setMainCourse] = useState([]);

    const fetchData = async () => {
        const response = await axios.get('http://192.168.1.2:8080/dishes/getAllDishes', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = response.data;

        setSoups(data.filter(t => t.dishType === "soup"));
        setMainCourse(data.filter(t => t.dishType === "mainCourse"));
    }

    useEffect( () => {
        let a = fetchData();
    }, []);

    const renderCategory = (categoryName, dishes) => {
        return(
            <>
                <h2 style={{ textAlign: 'center', margin: "10px" }}>{categoryName}</h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
                    {dishes.map(dish => (
                        <div key={dish.id} style={{margin: '1em'}} className="order-details-item">
                            <Card style={{ width: '18rem', zIndex:1}}>
                                <Card.Body>
                                    <Card.Title>{dish.name}</Card.Title>
                                    <p>Cena: {dish.price} zł</p>
                                    <p>Składniki: {dish.ingredients.join(', ')}</p>
                                </Card.Body>
                                <Link to={`/admin-panel/edit-menu/${dish.id}`}>
                                    <MDBBtn
                                        style={{ margin: "0.5rem", marginRight: "0.5rem" }}
                                        className="button"
                                    >
                                        Edycja
                                    </MDBBtn>
                                </Link>
                            </Card>
                        </div>
                ))}
                </div>
            </>
        );
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h1 style={{ textAlign: 'center', margin: "10px" }}>Edycja menu</h1>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
                    <Link to="/admin-panel/edit-menu/addDish-panel">
                        <MDBBtn className="button button2">
                            Dodaj danie
                        </MDBBtn>
                    </Link>
                </div>

                {renderCategory("Zupy", soups)}
                {renderCategory("Dania główne", mainCourse)}

            </div>
        </div>
    );
}

export default EditMenu;
