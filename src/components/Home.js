import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

export default function Home() {
    const [coins, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(10);
    const [selectedOption, setSelectedOption] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const fetchCoins = async () => {
            const response = await axios.get(
                'https://api.coinpaprika.com/v1/coins'
            );
            setCoins(response.data);
        };
        fetchCoins();
    },[]);

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    const ellipsis = '...';

    // Membuat array nomor halaman
    for (let i = 1; i <= Math.ceil(coins.length / coinsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Menentukan nomor halaman yang ditampilkan di pagination
    const getPageNumbers = () => {
        const totalPages = pageNumbers.length;
        const displayLimit = 5;

        // Jika total halaman <= batas tampilan, tampilkan semua nomor halaman
        if (totalPages <= displayLimit) {
            return pageNumbers;
        }

        const currentPageIndex = currentPage - 1;

        // Jika halaman saat ini dekat dengan awal, tampilkan nomor halaman awal dan akhir beserta ellipsis
        if (currentPageIndex < displayLimit - 2) {
            return [...pageNumbers.slice(0, displayLimit - 1), ellipsis, totalPages];
        }

        // Jika halaman saat ini dekat dengan akhir, tampilkan nomor halaman awal beserta ellipsis dan nomor halaman akhir
        if (currentPageIndex > totalPages - displayLimit + 1) {
            return [1, ellipsis, ...pageNumbers.slice(totalPages - displayLimit + 2)];
        }

        // Jika halaman saat ini berada di antara halaman awal dan akhir, tampilkan nomor halaman awal, ellipsis, nomor halaman saat ini, ellipsis, dan nomor halaman akhir
        const startPageIndex = currentPageIndex - 1;
        const endPageIndex = currentPageIndex + 1;
        return [1, ellipsis, ...pageNumbers.slice(startPageIndex, endPageIndex), ellipsis, totalPages];
    };

    //delete
    const handleDelete = (coinId) => {
        const updatedCoins = coins.filter((coin) => coin.id !== coinId);
        setCoins(updatedCoins);
    };


    //filter
    const filteredCoins = currentCoins.filter((coin) => {
        // selectedOption === 'all' && 
        if (searchTerm === '') {
            return true;
        }

        // if (selectedOption !== 'all' && searchTerm === '') {
        //     return coin.is_active === (selectedOption === 'active');
        // }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            // coin.is_active === (selectedOption === 'active') &&
            (coin.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                coin.symbol.toLowerCase().includes(lowerCaseSearchTerm))
        );
    });

    

    return (
        <div className="App">
            <div className="filter-container">
                {/* <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select> */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className="w-15rem">ID</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Rank</th>
                        <th>Type</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCoins.map((coint) =>
                        <tr key={coint.id}>
                            <a href={`/coint/${coint.id}`} target="_blank">
                                {coint.id}
                            </a>
                            <td>{coint.name}</td>
                            <td>{coint.symbol}</td>
                            <td>{coint.rank}</td>
                            <td>{coint.type}</td>
                            <td>{coint.is_active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(coint.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination className="d-flex justify-content-end">
                {getPageNumbers().map((number, index) => (
                    <Pagination.Item key={index} active={number === currentPage} onClick={() => paginate(number)}>
                        {number === ellipsis ? '...' : number}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}
