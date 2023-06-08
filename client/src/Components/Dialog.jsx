function Dialog ({message, onDelete, id, setDialog}) {
    return <div 
        style={{position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        backgroundColor: "rgba(0,0,0,0.5)"}}>

            <div style={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto",
                        marginTop: "20%",
                        width: "30vw",
                        background: "white",
                        padding: "30px",
                        borderRadius: "15px"}}>

                <h3>{message}</h3>
                <div >
                    <button onClick={() => {onDelete(id); setDialog(false)}}>Yes</button>
                    <button onClick={() => {setDialog(false)}}>No</button>
                </div>

            </div>

    </div>
}

export default Dialog