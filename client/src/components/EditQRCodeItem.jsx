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
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const EditQRCodeItem = (props) => {

    const [value, setValue] = useState("");

    const { id } = useParams();

    const [basicModal, setBasicModal] = useState(false);
    const toggleClose = () => {
        if(basicModal) {
            setBasicModal(!basicModal);
        }
    };
    const toggleOpen = () => setBasicModal(!basicModal);

    const [dialogTitle, setDialogTitle] = useState("Potwierdzenie");
    const [dialogDescription, setDialogDescription] = useState("");
    const [dialogAction, setDialogAction] = useState(() => {});

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://192.168.1.2:8080/qrCode/getValue/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;

            setValue(data.qrCode);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const dialog = (title, description, action) => {
        if (!value) {
            toast.error("Wszystkie pola muszą być uzupełnione", { position: "top-left", autoClose: 2000 });
        } else {
            setDialogTitle(title);
            setDialogDescription(description);
            setDialogAction(() => action);
            toggleOpen();
        }
    }

    const updateQRCode = async () => {
        try {
            let body = JSON.stringify({
                id: id,
                qrCode: value,
                type: "tableNo",
            });

            const response = await axios.post(`http://192.168.1.2:8080/qrCode/updateQRCode`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Zmodyfikowano kod QR" , {position: "top-left", autoClose: 2000});
            navigate("/admin-panel/edit-qr-code");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteQRCode = async () => {
        try {
            const response = await axios.delete(`http://192.168.1.2:8080/qrCode/deleteQRCode/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Usunięto kod QR" , {position: "top-left", autoClose: 2000});
            navigate("/admin-panel/edit-qr-code");
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
                        label='Numer stolika'
                        id='form1'
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <MDBBtn className="button" style={{ marginRight: "1.2rem" }} onClick={() => dialog("Potwierdzenie", "Zapisać zmiany?", updateQRCode)}>Zmień</MDBBtn>
                        <MDBBtn className="button" onClick={() => dialog("Potwierdzenie", "Czy na pewno chcesz usunąć ten kod QR?", deleteQRCode)}>Usuń</MDBBtn>
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

export default EditQRCodeItem;
