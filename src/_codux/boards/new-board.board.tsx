import React from 'react'
import { createBoard } from '@wixc3/react-board';
import {Form} from "../../components/Form"

export default createBoard({
    name: 'New Board',
    Board: () => <Form />,
    isSnippet: true,
});
