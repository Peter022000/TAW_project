import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
    MDBModal, MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader, MDBModalTitle
} from "mdb-react-ui-kit";
import {useNavigate, useParams} from "react-router-dom";
import {DishType} from "../types/dishTypes";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const EditMenuItem = (props) => {

    const [dishType, setDishType] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");

    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const toggleClose = () => {
        if(basicModal) {
            setBasicModal(!basicModal);
        }
    };

    const [dialogTitle, setDialogTitle] = useState("Potwierdzenie");
    const [dialogDescription, setDialogDescription] = useState("");
    const [dialogAction, setDialogAction] = useState(() => {});

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://192.168.1.2:8080/dishes/getDishById/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const dish = response.data;

            setName(dish.name);
            setDishType(dish.dishType);
            setPrice(dish.price);
            setIngredients(dish.ingredients);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const dialog = (title, description, action) => {
        if (!name || !dishType || !price || !ingredients) {
            toast.error("Wszystkie pola muszą być uzupełnione", { position: "top-left", autoClose: 2000 });
        } else {
            setDialogTitle(title);
            setDialogDescription(description);
            setDialogAction(() => action);
            toggleOpen();

        }
    }

    const updateDish = async () => {
        try {
            const updatedIngredients = ingredients ? ingredients : "";

            const ingredientsArray = updatedIngredients ? updatedIngredients.split(',') : [];

            let body = JSON.stringify({
                id: id,
                dishType: dishType,
                name: name,
                price: price,
                ingredients: ingredientsArray
            });

            const response = await axios.post(`http://192.168.1.2:8080/dishes/updateDish`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Zmodyfikowano danie" , {position: "top-left", autoClose: 2000});
            navigate("/admin-panel/edit-menu");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteDish = async () => {
        try {
            const response = await axios.delete(`http://192.168.1.2:8080/dishes/deleteDish/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Usunięto danie" , {position: "top-left", autoClose: 2000});
            navigate("/admin-panel/edit-menu");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        let a = fetchData();
    }, []);

    return (
        <div className="page-container">
            <div className="content-wrap">
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Nazwa'
                        id='form1'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <h6 style={{fontSize: "1.2rem"}}>Typ:</h6>
                    <div style={{marginBottom: "1.5rem", marginTop: "1.5rem"}}>
                        {Object.values(DishType).map(type => (
                            <div key={type} className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="dishTypeOptions"
                                    id={`inlineRadio${type}`}
                                    value={type}
                                    checked={dishType === type}
                                    onChange={(e) => setDishType(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor={`inlineRadio${type}`}>
                                    {type === 'mainCourse' ? 'Danie główne' : 'Zupa'}
                                </label>
                            </div>
                        ))}
                    </div>
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Cena'
                        id='form1'
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Składniki (rozdzielać przecinkiem bez spacji)'
                        id='form1'
                        type='text'
                        value={ingredients}
                        onChange={(e) => {
                            setIngredients(e.target.value);
                        }}/>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <MDBBtn className="button" style={{ marginRight: "1.2rem" }} onClick={() => dialog("Potwierdzenie", "Zapisać zmiany?", updateDish)}>Zmień</MDBBtn>
                        <MDBBtn className="button" onClick={() => dialog("Potwierdzenie", "Czy na pewno chcesz usunąć to danie?", deleteDish)}>Usuń</MDBBtn>
                    </div>
                </MDBContainer>
                <MDBModal open={basicModal} onClose={toggleClose} setOpen={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>{dialogTitle}</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>{dialogDescription}</MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleOpen}>
                                    Nie
                                </MDBBtn>
                                <MDBBtn onClick={dialogAction}>Tak</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>
        </div>
    );
}

export default EditMenuItem;
