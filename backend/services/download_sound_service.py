import os
import re
from pytube import YouTube
from moviepy.editor import *

class DownloadSoundService:

    def downloadMusic(self, url, type):
        yt:YouTube = YouTube(url)
        yt.title = f"{yt.title}_{yt.length}"
        path = f"{os.path.dirname(os.path.realpath('__file__'))}/backend/sounds"

        if(type == "music"):
            ys = yt.streams.filter(only_audio=True)[0]
            print(f"Downloading - {yt.title} for {path} ...")
            ys.download(f"{path}")
            print("Download completed!")
            print(f"Converting - {yt.title}.mp4 for {yt.title}.wav in {path} ...")
            self.convertMp4ToWav(path, self.removeSpecialCharacter(yt.title))
            print("Conversion completed!")
            return f"{path}/{self.removeSpecialCharacter(yt.title)}.wav"

        ys = yt.streams.filter(only_audio=False)[0]
        print(f"Downloading - {yt.title} for {path} ...")
        ys.download(f"{path}")
        print("Download completed!")
            
        return f"{path}/{self.removeSpecialCharacter(yt.title)}.mp4"

    def convertMp4ToWav(self, path, filename):
        video = AudioFileClip(os.path.join(f"{path}/{filename}.mp4"))
        video.write_audiofile(os.path.join(f"{path}/{filename}.wav"))
        os.remove(f"{path}/{filename}.mp4")

    def removeSpecialCharacter(self, texto):
        texto_sem_especiais = re.sub(r'[^\w\s]', '', texto)
        return texto_sem_especiais