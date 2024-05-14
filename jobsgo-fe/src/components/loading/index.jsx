import IconLoading from '~/assets/gif/loading.gif';
const Loading = () => {
    return (
        <div className="bg-black/30 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-50">
            <img src={IconLoading} alt="loading"></img>
        </div>
    );
};

export default Loading;
