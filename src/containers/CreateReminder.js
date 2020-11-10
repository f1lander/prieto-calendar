import { useState } from 'react';
import Drawer from 'react-drag-drawer';

const CreateReminder = (props) => {

    const { reminder, open, setOpen } = props;

    const [event, setEvent] = useState(reminder);

    return <Drawer>
        
    </Drawer>
}