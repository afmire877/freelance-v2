import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { TopicScore } from '../../../components/topic-score/topic-score';

export default createBoard({
    name: 'TopicScore',
    Board: () => <TopicScore />,
    isSnippet: true,
});
