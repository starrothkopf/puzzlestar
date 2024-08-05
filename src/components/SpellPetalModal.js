export default function SpellPetalModal({countdown, show}) {
    if (!show) return null;
    return (
        <div className="modal">
            <p>You found all the words!</p>
            <div className="timer">
            {padWithZero(countdown.hours)}:{padWithZero(countdown.minutes)}:{padWithZero(countdown.seconds)}
            </div>
        </div>
    )
}

const padWithZero = (num) => {
    return num.toString().padStart(2, '0');
  };