import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Film } from "lucide-react";
import React from "react";

const Header: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            sx={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderBottom: `1px solid ${theme.palette.divider}`,
                py: 1,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: theme.palette.primary.main,
                        }}
                    >
                        <Film size={28} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{
                                ml: 1,
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                                textDecoration: "none",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            AnimeVault
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Typography
                            variant="body2"
                            noWrap
                            component="div"
                            sx={{
                                ml: 2,
                                color: theme.palette.text.secondary,
                            }}
                        >
                            Your personal anime collection
                        </Typography>
                    )}

                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
