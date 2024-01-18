import React, {useState} from "react";
import axios from "axios";
import {
    MDBBtn, MDBContainer, MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {DishType} from "../types/dishTypes";
import {act} from "react-dom/test-utils";

const EditMenuAddDish = (props) => {

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

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const dialog = () => {
        if (!name || !dishType || !price || !ingredients) {
            toast.error("Wszystkie pola muszą być uzupełnione", { position: "top-left", autoClose: 2000 });
        } else {
            toggleOpen();
        }
    }

    const addDish = async () => {
        try {
            const updatedIngredients = ingredients ? ingredients : "";

            const ingredientsArray = updatedIngredients ? updatedIngredients.split(',') : [];

            let body = JSON.stringify({
                dishType: dishType,
                name: name,
                price: price,
                ingredients: ingredientsArray
            });

            const response = await axios.post(`http://192.168.1.2:8080/dishes/addDish`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Dodano danie" , {position: "top-left", autoClose: 2000});
            act(() => {
                navigate('/admin-panel/edit-menu');
            });
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

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
                        }}                    />
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <MDBBtn className="button" style={{ marginRight: "1.2rem" }} onClick={() => dialog()}>Zapisz</MDBBtn>
                    </div>
                </MDBContainer>
                <MDBModal open={basicModal} onClose={toggleClose} setOpen={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Potwierdzenie</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>Czy chcesz zapisać danie?</MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleOpen}>
                                    Nie
                                </MDBBtn>
                                <MDBBtn onClick={() => addDish()}>Tak</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>
        </div>
    );
}

export default EditMenuAddDish;
