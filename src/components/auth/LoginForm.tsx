import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setSession } from "../utils/sessionHelper";
import { AuthFlow } from "../../lib/loginradius-react-sdk";
import { QRCodeCanvas } from "qrcode.react";

interface LoginFormProps { onToggleMode: () => void }
interface ApiError { error: string }

export const LoginForm: React.FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [qrValue, setQrValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLoginSuccess = (response: any) => {
    console.log("Passkey Login successful:", response);

    const token = response?.access_token || response?.data?.access_token;
    if (token) {
      setSession(token);
    } else {
      console.error("No access token found");
      return;
    }
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");
    navigate(redirect || "/dashboard", { replace: true });
  };

  const handleError = (error: ApiError) => {
    console.error("Auth error:", error?.error || error);
  };

  const generateQrCode = async () => {
    try {
      const res = await fetch("https://devcloud-api.lrinternal.com/sso/mobile/generate?apikey=8b95fe7e-6dd1-4157-8e5c-f49de4257930"); // Replace with actual API
      const data = await res.json();

      if (data?.code) {
        setQrValue(data.code);
        setShowModal(true); // Open modal
        startPingApi(data.code);
      } else {
        console.error("API did not return a code");
      }
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const startPingApi = (code: any) => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(
          `https://devcloud-api.lrinternal.com/sso/mobile/token?code=${code}&apikey=8b95fe7e-6dd1-4157-8e5c-f49de4257930`
        );
        const data = await res.json();

        // If access_token exists and is not null, stop the interval
        if (data?.access_token) {
          console.log("Access token received:", data.access_token);
          clearInterval(intervalId);
          const token = data.access_token;
          if (token) {
            setSession(token);
          } else {
            console.error("No access token found");
            return;
          }
          const params = new URLSearchParams(location.search);
          const redirect = params.get("redirect");
          navigate(redirect || "/dashboard", { replace: true });

        } else {
          console.log("Still waiting for token...");
        }
      } catch (err) {
        console.error("Error in ping API:", err);
      }
    }, 3000); // 3 seconds
  };
  return (
    <div>
      {/* AuthFlow login form */}
      <AuthFlow onSuccess={handleLoginSuccess} onError={handleError} />

      {/* Generate QR button */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={generateQrCode}
          style={{
            width: "var(--sdk-card-width, 400px)",
            margin: "10px auto 0",
            display: "block",
            backgroundColor: "#0078d4",
            color: "#fff",
            border: "none",
            padding: "10px 0",
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
            textAlign: "center"
          }}
        >
          Scan QR Code For Login
        </button>
      </div>

      {/* QR Code Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                lineHeight: "1"
              }}
            >
              ×
            </button>
            <h3 style={{ marginBottom: "20px" }}>Scan this QR Code</h3>
            <QRCodeCanvas value={qrValue} size={220} />
          </div>
        </div>
      )}

    </div>
  );
};