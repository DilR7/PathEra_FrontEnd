import { Button } from "./ui/button";
import LoadingButton from "./ui/loading-button";
import { Textarea } from "./ui/textarea";

type SpeechEngineProps = {
  audio: string | null;
  transcription: string | null;
  setTranscription: (transcription: string) => void;
  isAudioVisible: boolean;
  loadingTranscription: boolean;
  onReRecord: () => void;
  onFinalize: () => void;
  startRecording: () => void;
  resetRecording: () => void;
  loading: boolean;
  showScore: boolean;
};

const SpeechEngine = ({
  audio,
  transcription,
  setTranscription,
  isAudioVisible,
  loadingTranscription,
  onReRecord,
  onFinalize,
  loading,
  showScore,
}: SpeechEngineProps) => (
  <div
    className={`transition-all duration-300 ease-out transform ${
      isAudioVisible || transcription !== null
        ? "scale-100 opacity-100"
        : "scale-75 opacity-0"
    } bg-blue-100 flex flex-col gap-2 p-4 rounded-lg w-5/6 ${
      transcription !== null ? "md:w-2/3 lg:w-[40%]" : "md:w-[300px]"
    }`}
  >
    {isAudioVisible && audio && !transcription && (
      <>
        <audio
          controls
          src={audio}
          className="w-full"
          onCanPlayThrough={() => console.log("Audio loaded")}
        />
        {loadingTranscription && <LoadingButton className="mt-2" />}
      </>
    )}
    {transcription !== null && (
      <div className="bg-blue-100 rounded-lg">
        {showScore ? (
          <p
            className={`${
              showScore ? "" : "mb-4"
            } md:mb-0 text-sm md:text-lg break-words whitespace-normal`}
          >
            {transcription}
          </p>
        ) : (
          <Textarea
            className="w-full text-sm md:text-lg min-h-[180px]"
            onChange={(e) => setTranscription(e.target.value)}
            value={transcription}
          />
        )}
        {!showScore && (
          <div className="flex flex-col md:flex-row gap-2 mt-2">
            <Button
              onClick={onReRecord}
              disabled={loading}
              className="px-4 py-2 border border-primary text-primary bg-transparent rounded-md transition-all duration-300 active:scale-95 shadow-md hover:text-white hover:shadow-lg focus:outline-none w-full sm:w-auto"
            >
              Re-record
            </Button>
            {loading ? (
              <LoadingButton className="w-full md:w-auto" />
            ) : (
              <Button
                onClick={onFinalize}
                className="px-4 py-2 bg-primary text-white rounded-md transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none w-full md:w-auto"
              >
                Finalize
              </Button>
            )}
          </div>
        )}
      </div>
    )}
  </div>
);

export default SpeechEngine;
