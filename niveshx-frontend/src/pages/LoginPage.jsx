import { useState } from 'react';
import { Box, Button,TextField, Typography } from '@mui/material';
import { login } from '../auth/authApi';
import stockBg from "../assets/backgrounds/stock-theme-bg.png";
import niveshXLogo from "../assets/logo/niveshx-logo.png";
import GoogleIcon from "@mui/icons-material/Google";




const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            const res = await login(form);
            localStorage.setItem("accessToken", res.accessToken);
            alert("Login successful");
        } catch {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${stockBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
        }}
        >
            <Box
            sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(2, 6, 23, 0.75)",
                zIndex: 0,
            }}
            />

            <Box
            sx={{
                width: 380,
                p: 4,
                borderRadius: "14px",

                // 🔹 Surface color (lighter than background)
                backgroundColor: "#020617",

                // 🔹 Strong elevation
                boxShadow: `
                0 30px 70px rgba(0,0,0,0.85),
                0 0 0 1px rgba(34,197,94,0.25)
                `,

                // 🔹 Subtle emerald edge
                border: "1px solid rgba(34,197,94,0.35)",

                position: "relative",
                zIndex: 1,
            }}
            >

                
            <Box
            sx={{
                height: 4,
                width: "100%",
                mb: 3,
                borderRadius: 2,
                background: "linear-gradient(90deg, #22c55e, #84cc16)",
            }}
            />

                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mb: 3,
                }}
                >
                {/* Logo Container */}
                <Box
                    sx={{
                    width: 110,
                    height: 70,
                    borderRadius: "20px",
                    backgroundColor: "#355a7fff", // light background for visibility
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
                    }}
                >
                    <Box
                    component="img"
                    src={niveshXLogo}
                    alt="NiveshX Logo"
                    sx={{
                        width: 200,
                        height: "auto",
                        objectFit: "contain",
                    }}
                    />
                </Box>

                {/* App Name */}
                <Typography
                    variant="h4"
                    sx={{
                    color: "#f8fafc",
                    fontWeight: 700,
                    letterSpacing: "0.6px",
                    }}
                >
                    Welcome Back!
                </Typography>
                </Box>





                <TextField
                    fullWidth
                    margin="normal"
                    sx={{
                        input: { color: "#f8fafc" },
                        label: { color: "#94a3b8" },
                    }}
                    name="email"
                    label="Email"
                    onChange={handleChange}
                />

                <TextField
                    margin="normal"
                    sx={{
                        input: { color: "#f8fafc" },
                        label: { color: "#94a3b8" },
                    }}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                />

                {error && (
                    <Typography color="error" fontSize={14}>
                        {error}
                    </Typography>
                )}

            <Button
                fullWidth
                disabled={loading}
                onClick={handleLogin}
                sx={{
                    mt: 3,
                    py: 1.2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "12px",
                    color: "#ffffff",
                    background: "linear-gradient(135deg, #059669, #84cc16)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #047857, #65a30d)",
                    },
                    boxShadow: "0 10px 28px rgba(5,150,105,0.45)",
                    "&:active": {
                    transform: "scale(0.97)",
                    },
                }}
                >
                {loading ? "Signing in..." : "Login"}
            </Button>

            {/* Google login */}
            <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
                mt: 2,
                py: 1.1,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 500,
                color: "#f8fafc",
                borderColor: "rgba(255,255,255,0.25)",
                backgroundColor: "rgba(255,255,255,0.03)",
                transition: "all 0.25s ease",
                "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.45)",
                transform: "translateY(-1px)",
                },
            }}
            >
            Continue with Google
            </Button>



            </Box>    
        </Box>

    );
};

export default LoginPage;