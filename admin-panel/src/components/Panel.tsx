import '../App.css'
import {Box, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function Panel() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    let open: boolean = !!anchorEl;
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState("");

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>, topic: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedTopic(topic);
    }

    const handleOptionClick = (option: string) => {
        console.log(option);
        console.log("correctTopic: " + selectedTopic)

        if (option === "Create") {
            console.log("navigating... to testCreateEntity")

            navigate('/createTest', {
                state: selectedTopic.toLowerCase()
            })
        }

        setAnchorEl(null);
    }

    const topics: string[] = ['Writing', 'Reading', 'Grammar', 'Listening', 'Tests']

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 6,
                justifyContent: 'center',
            }}
        >
            {topics.map((topic) => (
                <>
                    <Button
                        sx={{
                            flex: 1,
                            variant: 'outlined',
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "14px",
                            fontWeight: 'bold',
                            color: "#535353",
                            padding: "5px 20px",
                        }}
                        onClick={(event) => handleOpen(event, topic)}
                    >
                        {topic}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleOptionClick}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => handleOptionClick("Create")}>Create</MenuItem>
                        <MenuItem onClick={() => handleOptionClick("Update")}>Update</MenuItem>
                        <MenuItem onClick={() => handleOptionClick("Delete")}>Delete</MenuItem>
                    </Menu>
                </>
            ))}
        </Box>

    )
}

export default Panel
