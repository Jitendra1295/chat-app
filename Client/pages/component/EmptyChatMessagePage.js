import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/system';

const RootContainer = styled('div')({
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#3F3F3F',
});

const Illustration = styled('img')({
    width: '70px',
    height: '70px',
    marginBottom: '30px',
});

const Title = styled(Typography)({
    marginBottom: '20px',
    color: "#FFFFFF"
});

const Subtitle = styled(Typography)({
    color: "#FFFFFF",
    marginBottom: '30px',
});

const ButtonStyled = styled(Button)({
    borderRadius: '25px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
});

const EmptyChatMessagePage = ({ onNewChatClick }) => {
    return (
        <RootContainer>
            <Illustration src="/chat-message.png" alt="Empty Chat" />
            <Title variant="h4">
                Start a Conversation
            </Title>
            <Subtitle variant="body1">
                Choose a contact on the left to begin chatting.
            </Subtitle>
            <ButtonStyled
                variant="contained"
                color="primary"
                onClick={onNewChatClick}
                startIcon={<ChatIcon />}
            >
                Start New Chat
            </ButtonStyled>
        </RootContainer>
    );
};

export default EmptyChatMessagePage;
