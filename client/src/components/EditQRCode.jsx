import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

const EditQRCode = (props) => {

    const [qrCodes, setQrCodes] = useState([]);

    const token = useSelector((state) => state.auth.token);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://192.168.1.2:8080/qrCode/getQRCodes`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;

            setQrCodes(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect( () => {
        let a = fetchData();
    }, []);

    const download = (qrCodeId) => {
        const qrCodeElement = document.getElementById(`qrCode-${qrCodeId}`);

        if (qrCodeElement) {
            html2canvas(qrCodeElement).then((canvas) => {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = `qrCode_${qrCodeId}.png`;
                link.click();
            });
        }
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h2 style={{ textAlign: 'center', margin: "10px" }}>Edycja kodów QR</h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
                    <Link to="/admin-panel/edit-qr-code/add-qr-code-panel">
                        <MDBBtn className="button button2">
                            Dodaj kod QR numeru stolika
                        </MDBBtn>
                    </Link>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
                    {qrCodes.map(qrCode => (
                        <div key={qrCode.id} style={{margin: '1em'}} className="order-details-item">
                            <Card style={{ width: '18rem', zIndex:1}}>
                                <Card.Body id={`qrCode-${qrCode.id}`}>
                                    <Card.Title>Numer stolika: {qrCode.qrCode}</Card.Title>
                                    <p>
                                        <QRCode
                                            value={qrCode.id}
                                        />
                                    </p>
                                </Card.Body>
                                <div style={{ justifyContent: "center", alignItems: "center"}}>
                                    <MDBBtn
                                        style={{ margin: "0.5rem", marginRight: "0.5rem" }}
                                        className="button"
                                        onClick={() => download(qrCode.id)}
                                    >
                                        Pobierz kod QR
                                    </MDBBtn>
                                    <Link to={`/admin-panel/edit-qr-code/${qrCode.id}`}>
                                        <MDBBtn
                                            style={{ margin: "0.5rem", marginRight: "0.5rem" }}
                                            className="button"
                                        >
                                            Edycja
                                        </MDBBtn>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default EditQRCode;
