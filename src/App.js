import React, { useState } from 'react';
import './App.css';
import data from './components/data.json'
import PanelContent from './components/scripts/PanelContent';
function App() {
    const [atom, setAtom] = useState(null);

    function colsePanel(target) {
        const panelMain = document.querySelector('.panelMain');
        if (target.target.className.includes("panelMain")) {
            panelMain.classList.toggle('active');
        }
    }
    const openPanel = (atom, event) => {
        const panelMain = document.querySelector('.panelMain');
        panelMain.classList.add('active');
        const clickedDiv = event.currentTarget;

        const rect = clickedDiv.getBoundingClientRect();

        const x = rect.left;
        const y = rect.top;

        setAtom(<PanelContent atom={atom} elX={x} elY={y} />)


        if (panelMain && panelMain.firstChild) {
            panelMain.firstChild.scrollTop = 0
        }
        const checkboxes = panelMain.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => (checkbox.checked = false));
    };
    return (
        <div className="App">
            <div className="panelMain" onClick={(target) => colsePanel(target)}>
                {atom}
            </div>
            <main id="main">
                {data === null ? (
                    <p>Loading...</p>
                ) : (
                    data.en.elements.map(data => (
                        <div
                            className="element"
                            style={{
                                "--element-color": `#${data.cpkHex ? data.cpkHex.toString() : "888888"} `,
                                "--element-bg": `#${data.cpkHex ? data.cpkHex.toString() : "888888"}44`,
                                gridArea: `${data.ypos} /${data.xpos}`
                            }
                            }
                            onClick={(event) => openPanel(data, event)}
                            key={data.symbol}
                        >
                            <span className="atom-number">{data.number}</span>
                            <span className="symbol">{data.symbol}</span>
                            <span className="name">{data.name}</span>
                            <span className="atomic-mass">{data.atomic_mass.toFixed(2)}</span>
                        </div >
                    ))
                )}
            </main >


        </div>
    );
}

export default App;
