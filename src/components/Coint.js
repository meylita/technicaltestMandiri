import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Coint() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        const fetchCoinDetail = async () => {
            try {
                const response = await fetch(`https://api.coinpaprika.com/v1/coins/${id}`);
                const data = await response.json();
                setCoin(data);
            } catch (error) {
                console.error('Error fetching coin detail:', error);
            }
        };

        fetchCoinDetail();
    }, [id]);

    if (!coin) {
        return <div>Loading...</div>;
    }

    return (


        <div>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>  <p className='text-primary'>Coint Detail</p>
                                <p>ID: {coin.id}</p>
                                <p>Name: {coin.name}</p>
                                <p>Symbol: {coin.symbol}</p>
                                <p>Type: {coin.type}</p>
                                <p>Active: {coin.is_active ? 'Active' : 'Inactive'}</p>
                                <p>Is New: {coin.is_new ? 'True' : 'False'}</p>
                                </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
