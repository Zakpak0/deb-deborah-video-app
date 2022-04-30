import Storage from "../firebase/storage"

export default function player({ video }: NodeJS.ReadableStream) {

    return (
        <div
            className="embed-responsive embed-responsive-21by9 relative w-2/3 mr-auto ml-auto overflow-hidden"
            style={{ paddingTop: "42.857143%" }}
        >
            <video
                className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full"
                allowfullscreen
                // data-gtm-yt-inspected-2340190_699="true"
                id="240632615"
            ><source src={video} />
            </video>
        </div>)
}
export async function getServerSideProps(context) {
    const videoPath = context.query?.video

    if (videoPath) {
        const video = Storage.download(videoPath)
        return {
            props: {
                video
            }
        }
    } else {
        return {
            props: {
            }
        }
    }
}