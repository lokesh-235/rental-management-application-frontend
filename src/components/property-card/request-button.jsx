import { useNavigate } from "react-router";
import styles from "./property-card.module.css";
import { useState } from "react";

export default function RequestButton({
  isLoggedIn,
  postTenantRequest,
}) {
  const navigate = useNavigate();

  const [openMessageInput, setOpenMessageInput] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setOpenMessageInput(true);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    try {
      setLoading(true);
      await postTenantRequest(message);
      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    } finally {
      setLoading(false);
      setOpenMessageInput(false);
      setMessage("");
    }
  };

  return (
    <>
      <button
        className={styles.requestBtn}
        onClick={handleRequest}
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : isLoggedIn
          ? "Request Property"
          : "Login to Request"}
      </button>

      {!isLoggedIn && (
        <p className={styles.loginHint}>
          Please login to send a request
        </p>
      )}

      {openMessageInput && (
        <div className={styles.messageBox}>
          <textarea
            style={{ width: "300px" }}
            placeholder="Send a message to property owner"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      )}
    </>
  );
}
