import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// @mui
import { List } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { SkeletonConversationItem } from '../../../components/skeleton';
//
import ChatConversationItem from './ChatConversationItem';

// ----------------------------------------------------------------------

ChatConversationList.propTypes = {
  conversations: PropTypes.object,
  isOpenSidebar: PropTypes.bool,
  activeConversationId: PropTypes.string,
  sx: PropTypes.object,
};

export default function ChatConversationList({
  Number,
  conversations,
  isOpenSidebar,
  activeConversationId,
  sx,
  ...other
}) {
  const { push } = useRouter();

  const handleSelectConversation = (conversationId, index) => {
    let conversationKey = '';
    const conversation = conversations.byId[index][conversationId];
    console.log('conversation');
    console.log(conversation);
    if (conversation.type === 'GROUP') {
      conversationKey = conversation.id;
    } else {
      const otherParticipant = conversation.participants.find(
        // (participant) => participant.id !== '8864c717-587d-472a-929a-8e5f298024da-0'

        (participant) => participant !== 'Kh8MS929TiV3OurFUISBgca3hhr2'
      );
      if (otherParticipant?.username) {
        conversationKey = otherParticipant?.username;
      }
    }
    push(PATH_DASHBOARD.chat.view(conversationKey));
  };

  const loading = !conversations.allIds.length;

  return (
    <List disablePadding sx={sx} {...other}>
      {(loading ? [...Array(Number)] : conversations.allIds).map((conversationId, index) =>
        conversationId ? (
          <ChatConversationItem
            key={conversationId}
            isOpenSidebar={isOpenSidebar}
            conversation={conversations.byId[index][conversationId]}
            isSelected={activeConversationId === conversationId}
            onSelectConversation={() => handleSelectConversation(conversationId, index)}
          />
        ) : (
          <SkeletonConversationItem key={index} />
        )
      )}
    </List>
  );
}
