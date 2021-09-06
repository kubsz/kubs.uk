import React from 'react';

import { BsMusicNoteBeamed, BsMusicNote } from 'react-icons/bs';
import { GiMusicalNotes } from 'react-icons/gi';
import { IoMdMusicalNotes } from 'react-icons/io';
import { RiMusicFill } from 'react-icons/ri';

const MusicNotes = () => {
    const noteIcons = [<BsMusicNote />, <BsMusicNoteBeamed />, <GiMusicalNotes />, <IoMdMusicalNotes />, <RiMusicFill />];

    console.log(React.cloneElement(noteIcons[2]), [
        {
            className: 'cap'
        }
    ]);

    const generateNote = (i) => {
        const node = React.cloneElement(noteIcons[Math.floor(Math.random() * noteIcons.length)], {
            style: {
                transform: `rotate(${Math.random() * 360}deg)`,
                left: `${Math.random() * 200 - 50}%`,
                top: `${Math.random() * 120 - 10}%`,
                opacity: `.0${Math.floor(Math.random() * 1000) + 5}`
            },
            className: 'music-notes__note',
            size: `${Math.random() * 20 + 1}rem`,
            key: i
        });

        return node;
    };

    return <div className="music-notes">{Array.from(Array(50).keys()).map((i) => generateNote(i))}</div>;
};

export default MusicNotes;
