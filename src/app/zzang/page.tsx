export default function zzang() {
    return (

        <div className="relative min-h-screen select-none">

            {/* 장윤지 메인*/}
            <div className="flex flex-col fixed top-[25vh] left-[50vw] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[30vh]  text-black p-8 items-center ">
                <p className="text-6xl font-bold ">⚾</p>
                <p className="text-3xl font-bold"><br/>장-하다,장윤지</p>
                <p className="text-8xl font-bold">d0.ZZang</p>
                <p className="text-lg font-bold"><br/>장윤지를 구성하는 것들로 가득차 있습니다.</p>
                <p className="text-lg font-bold">공간을 부유하는 것들을 잡아채 확인해보세요.</p>
                <div className="flex flex-row gap-8 p-8">
                    <a href='#' className="text-6xl font-bold">🟩</a>
                    <a href='#' className="text-6xl font-bold">🟪</a>

                </div>
            </div>

            {/* 스크롤 가능한 콘텐츠 */}
            <div className="h-[1000vh] bg-gray-100 p-8">
                <a href='#' className="text-4xl font-bold absolute top-[20vh] left-[105vw] -translate-x-1/2 -translate-y-1/2">👇</a>
                <a href='#' className="text-4xl font-bold absolute top-[80vh] -translate-x-1/2 -translate-y-1/2">👇</a>
            </div>
        </div>
    );
}
