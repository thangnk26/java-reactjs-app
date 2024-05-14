import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CustomQuill({ value, setJob, type, setMail }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];
    const handleChange = (newValue) => {
        switch (type) {
            case 'description':
                setJob((prev) => ({ ...prev, description: newValue }));
                break;
            case 'required':
                setJob((prev) => ({ ...prev, required: newValue }));
                break;
            case 'benefit':
                setJob((prev) => ({ ...prev, benefit: newValue }));
                break;
            case 'acceptMail':
                setMail((prev) => ({ ...prev, acceptMail: newValue }));
                break;
            case 'refuseMail':
                setMail((prev) => ({ ...prev, refuseMail: newValue }));
                break;
            case 'signature':
                setMail((prev) => ({ ...prev, signature: newValue }));
                break;
            default:
                return;
        }
    };
    return (
        <ReactQuill value={value} onChange={handleChange} theme="snow" modules={modules} formats={formats}></ReactQuill>
    );
}

export default CustomQuill;
