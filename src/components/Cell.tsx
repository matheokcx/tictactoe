import React from 'react'
import '../style.css';

export default function Cell({ valeur, action, style }) {
    return (
        <td style={style} className='case' onClick={action}>
            {valeur}
        </td>
    );
}