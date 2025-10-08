export function TextboxRating({ handleChange, txt }) {

    function onSetTxt(newTxt) {
        const target = { name: 'txt', value: newTxt };
        handleChange({ target });
    }

    return (
        <textarea
            name='txt'
            cols='50'
            rows='3'
            value={txt}
            onChange={(ev) => onSetTxt(ev.target.value)}
        >
        </textarea>
    )
}