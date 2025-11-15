export default function RestartButton(props) {
    const restartEvent = () => {
        location.reload();
    };
    return(
        <>
            <button className="buttonRestart" onClick={restartEvent} >
                Restart
            </button>
        </>
    )
}

