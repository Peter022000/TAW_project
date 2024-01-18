import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
} from "mdb-react-ui-kit";
import {act} from "react-dom/test-utils";

const EditDiscount = (props) => {

    const [id, setId] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [ordersRequired, setOrdersRequired] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const [basicModal, setBasicModal] = useState(false);
    const toggleClose = () => {
        if (basicModal) {
            setBasicModal(!basicModal);
        }
    };
    const toggleOpen = () => setBasicModal(!basicModal);

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.2:8080/discountSettings/getDiscountSettings`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const discountSettings = response.data;

            setId(discountSettings.id)
            setIsEnabled(discountSettings.isEnabled);
            setOrdersRequired(discountSettings.ordersRequired);
            setDiscountPercentage(discountSettings.discountPercentage * 100);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const dialog = () => {
        if (!ordersRequired || !discountPercentage) {
            toast.error("Wszystkie pola muszą być uzupełnione", {
                position: "top-left",
                autoClose: 2000,
            });
        } else {
            toggleOpen();
        }
    };

    const updateDiscountSettings = async () => {
        try {
            let body = JSON.stringify({
                id: id,
                isEnabled: isEnabled,
                ordersRequired: ordersRequired,
                discountPercentage: discountPercentage / 100
            });

            const response = await axios.post(
                "http://192.168.1.2:8080/discountSettings/saveDiscountSettings",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Zmodyfikowano ustawienia rabatu", {
                position: "top-left",
                autoClose: 2000,
            });
            act(() => {
                navigate("/admin-panel");
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        let a = fetchData();
    }, []);

    return (
        <div className="page-container">
            <div className="content-wrap">
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ fontSize: "1.2rem", marginRight: "1rem" }}>Status:</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="activeRadio"
                                value={true}
                                checked={isEnabled}
                                onChange={() => setIsEnabled(true)}
                            />
                            <label className="form-check-label" htmlFor="activeRadio">
                                Aktywny
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="inactiveRadio"
                                value={false}
                                checked={!isEnabled}
                                onChange={() => setIsEnabled(false)}
                            />
                            <label className="form-check-label" htmlFor="inactiveRadio">
                                Nieaktywny
                            </label>
                        </div>
                    </div>
                    <MDBInput
                        style={{ padding: "1rem", fontSize: "1.2rem" }}
                        wrapperClass="mb-4"
                        label="Wymagana liczba zamówień"
                        id="form2"
                        type="number"
                        value={ordersRequired}
                        onChange={(e) => setOrdersRequired(e.target.value)}
                    />
                    <MDBInput
                        style={{ padding: "1rem", fontSize: "1.2rem" }}
                        wrapperClass="mb-4"
                        label="Procent rabatu"
                        id="form3"
                        type="number"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <MDBBtn className="button" style={{ marginRight: "1.2rem" }} onClick={() => dialog()}>
                            Zmień
                        </MDBBtn>
                    </div>
                </MDBContainer>
                <MDBModal open={basicModal} onClose={toggleClose} setOpen={setBasicModal} tabIndex="-1">
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Potwierdzenie</MDBModalTitle>
                                <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>Zapisać zmiany?</MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={toggleOpen}>
                                    Nie
                                </MDBBtn>
                                <MDBBtn onClick={() => updateDiscountSettings()}>Tak</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>
        </div>
    );
};

export default EditDiscount;
