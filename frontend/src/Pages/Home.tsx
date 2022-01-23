import React, {useContext, useState} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {Link} from "react-router-dom";
import {Button, Spin} from 'antd';
import CreateLeague from "./Molecules/Create/CreateLeague";
import '../loading.css';
import '../transition.min.css';
import BigLoading from "./Atoms/Loading/BigLoading";
import {Document, Page, pdfjs} from 'react-pdf';
// @ts-ignore
import file from "./TheBigLeagueRulebook.pdf";
import {buttonStyles} from "./Molecules/Create/CreateStyles";
import {simButtonStyles} from "./Molecules/SimulationButtons/SimButtonStyles";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const Home: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const [numPages, setNumPages] = useState(10);
        const [pageNumber, setPageNumber] = useState(1);

        const onDocumentLoadSuccess = (numPages: any) => {
            setNumPages(numPages);
        }

        const previousPage = () => {
            setPageNumber(pageNumber - 1);
        }

        const nextPage = () => {
            setPageNumber(pageNumber + 1);
        }

        if (store.User === undefined) return (
            <Spin/>
        )
        else if (store.User.league && !store.User.franchise) return (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h1>Welcome to, {store.User.league.leagueName}!</h1>
                <h3>Click <Link to="/Franchise">here</Link> to create a Franchise!</h3>
            </div>
        )
        else if (store.User.league?.franchiseSet?.length > 1) return (
            <div>
                <div className="ld ld-slide-rtl-in">
                    <h1>Welcome to, {store.User.league?.leagueName}!</h1>
                    <h1>Good luck this season, {store.User.franchise?.franchise}!</h1>
                    <p>Please read the instructions to guide you on your way to victory</p>
                    <BigLoading animation="ld ld-bounce"/>
                </div>
                <div style={{height: "100vh", width: "200vw", display: "flex", overflow: "hidden"}}>
                    <Button style={{...buttonStyles, ...{width: '100px'}}} onClick={() => previousPage()}>
                        Previous Page
                    </Button>
                    <Button style={{...buttonStyles, ...{width: '100px'}}} onClick={() => nextPage()}>
                        Next Page
                    </Button>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber}/>
                    </Document>
                </div>
            </div>
        )
        else {
            return (
                <CreateLeague/>
            );
        }
    }
)

export default Home;
