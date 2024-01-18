import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
    MDBModal, MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader, MDBModalTitle
} from "mdb-react-ui-kit";
import {toast} from "react-toastify";

const EditQRCodeAdd = (props) => {

    const [value, setValue] = useState("");

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const toggleClose = () => {
        if(basicModal) {
            setBasicModal(!basicModal);
        }
    };

    const dialog = () => {
        if (!value) {
            toast.error("Wszystkie pola muszą być uzupełnione", { position: "top-left", autoClose: 2000 });
        } else {
            toggleOpen();
        }
    }

    const addQRCode = async () => {
        try {
            let body = JSON.stringify({
                qrCode: value,
                type: "tableNo",
            });

            const response = await axios.post(`http://192.168.1.2:8080/qrCode/addQRCode`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Dodano kod QR" , {position: "top-left", autoClose: 2000});
            navigate("/admin-panel/edit-qr-code");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Numer stolika'
                        id='form1'
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
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
                            <MDBModalBody>Czy chcesz zapisać kod QR?</MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleOpen}>
                                    Nie
                                </MDBBtn>
                                <MDBBtn onClick={() => addQRCode()}>Tak</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>
        </div>
    );
}

export default EditQRCodeAdd;
