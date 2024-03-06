import { styled } from '@mui/system';
import { Grid, TextField, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getSender, getSenderUser } from '../utility/utility';
import { useChat } from './context/chatContext';
import { useMediaQuery } from '@mui/material';
const ListContainer = styled(Grid)({
    width: '100%', // Set width to 100% to expand to the container's width
});

const ListWithScrollbar = styled(List)({
    overflowY: 'auto', // Show vertical scrollbar when content overflows
    maxHeight: '100vh', // Ensure that the list takes up the entire height of the container
});


const ListItemHover = styled(ListItem)({
    '&:hover': {
        backgroundColor: '#333333', // Adjust the hover background color as needed
    },
});

export default function ChatList({ loginUser, chats }) {
    const { setUser, setSelectedChat, setMobileView } = useChat();
    console.log("ChatList::", chats, loginUser);
    const isMobile = useMediaQuery('(max-width:600px)');
    const handleNewChat = (user) => {
        console.log("handleNewChat::", user);
        setSelectedChat(user)
        isMobile && setMobileView(true);
        setUser(getSenderUser(loginUser, user.users))
    }
    return (
        <ListContainer container direction="column">
            <TextField
                placeholder='Search'
                variant="outlined"
                fullWidth
                // value={searchTerm}
                // onChange={handleSearchChange}
                InputProps={{
                    style: {
                        borderRadius: 0,
                        height: "67px",
                        fontSize: 20,
                        color: '#FFFFFF', // Set font color to white
                        backgroundColor: '#3F3F3F' // Set background color
                    },
                    startAdornment: (
                        <IconButton aria-label="search">
                            <SearchIcon style={{ color: '#FFFFFF' }} />
                        </IconButton>
                    )
                }}
                style={{ width: "100%", backgroundColor: '#333333', hight: "75px" }}
            />
            <ListWithScrollbar style={{ marginRight: 20, backgroundColor: '#191919', height: "86.6vh", width: "100%" }}> {/* Ensure that the List fits within the container's width */}
                {chats && chats.map((chat) => (
                    <ListItemHover key={chat.id} onClick={() => { handleNewChat(chat) }}>
                        <ListItemAvatar>
                            <Tooltip label={chat.chatName} placement="bottom-start" hasArrow>
                                <Avatar alt={chat.name} src={chat?.groupAdmin?.pic} style={{ backgroundColor: '#1977e2' }} />
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText primary={!chat.isGroupChat
                            ? getSender(loginUser, chat.users)
                            :
                            chat.chatName}
                            // secondary={
                            //     chat.latestMessage && `${chat?.latestMessage?.sender?.name} :
                            //     ${chat?.latestMessage?.content?.length > 50
                            //         ? chat?.latestMessage?.content.substring(0, 51) + "..."
                            //         : chat?.latestMessage?.content}`


                            // }
                            style={{
                                color: 'white',
                                borderRadius: '10px',
                                fontWeight: 800
                            }}
                            secondaryTypographyProps={{ style: { color: 'white' } }}
                        />
                    </ListItemHover>
                ))}
            </ListWithScrollbar>
        </ListContainer >
    );
}

