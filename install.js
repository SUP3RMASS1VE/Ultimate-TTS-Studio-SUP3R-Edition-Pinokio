module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/SUP3RMASS1VE/Ultimate-TTS-Studio-SUP3R-Edition app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        conda: "tts_env",
        path: "app",
        message: [
          "conda install -c conda-forge pynini==2.1.6 -y",
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt",
          "uv pip install WeTextProcessing --no-deps",
          "pip uninstall phonemizer-fork -y",
          "pip install phonemizer-fork",
          "uv pip install --upgrade --force-reinstall --no-deps --no-cache-dir onnxruntime-gpu==1.22.0",
          "uv pip install voxcpm openai-whisper --no-deps"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          conda: "tts_env",
          path: "app",
          triton: true
        }
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "cocktailpeanut/oa" ],
        "--local-dir": "./checkpoints/openaudio-s1-mini",
      }
    },
    {
      when: "{{which('brew')}}",
      method: "shell.run",
      params: {
        message: "brew install espeak-ng"
      },
      next: 'end'
    },
    {
      when: "{{which('apt')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "apt install libaio-dev espeak-ng"
      },
      next: 'end'
    },
    {
      when: "{{which('yum')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "yum install libaio-devel espeak-ng"
      },
      next: 'end'
    },
    {
      when: "{{which('winget')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "winget install --id=eSpeak-NG.eSpeak-NG -e --silent --accept-source-agreements --accept-package-agreements"
      }
    },
    {
      id: 'end',
      method: 'input',
      params: {
        title: "Install Complete!!",
        description: "Install Complete."
      }
    },
  ]
}

