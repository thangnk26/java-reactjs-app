function SliderLine({ value, color = 'blue' }) {
    return (
        <div className="h-[20px] w-full rounded-lg overflow-hidden border bg-white">
            <div
                className={`h-full ${
                    color === 'blue' ? 'bg-blue-600' : color === 'green' ? 'bg-green-700' : 'bg-orange-600'
                } w-[${value}%] flex justify-center items-center text-white`}
            >
                {value} %
            </div>
        </div>
    );
}

export default SliderLine;
