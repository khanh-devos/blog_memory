---
category: ai
---

1. <b>What is generative AI?</b>
    - <b>AI</b>: Artificial Intelligence technology that can produce: text, audio, image or synthetic data. 
    - <b>GenAI</b>: generative Artificial Intelligence that creates new content based on what it has learned from existing content.
    - <b>AI agent</b>: a computer system that can reason, learn and act autonomously (like humans)
    - <b>Machine Learning</b>: a subfield of AI trains to create a model from input data. The model then can produce a data that is new and never seen in the input data. This mean now a machine can learn and create by a model, not a program.

    1.1 <b>How many types of ML?</b> There are 4 types: Supervised, Unsupervised, Reinforcement(not mentioned here) & Deep Learning.<br>
    - <b>Supervised</b> (labeled data): The data is tagged or differentiated seperately by a name or a type. (Example: pizza clients behaviors, who tips at the store will be points "o", who tips at delivery will be points "x"). In supervised learning, the model is to predict the future values. 

    <div class="typograms">

    <script type="text/typogram">

        +-----------------------+
        |  Tips by order type   |
        +-----------------------+

         10 
          ^
          |       xxx  xx
    Tip   |    x0x   x0x  
    Amount|    xx0 xx x0
          |    0x0  x x0 0x    
          |           x0x
          +-------------------->100 
            Total Bill

        x: Pick up   0: Delivery 

    The model is built to predict
    the future tip behavior.


    </script>

    <script type="text/typogram">

        +-----------------------+
        |  SUPERVISED LEARNING  |
        +-----------------------+
         
           +----------------+
           | Labeled data X |
           +----------------+
                  |
                  v
             +----------+
        +--->|   Model  |
        |    +----------+
     Model        |
     Update       v
        |   +-----------+         +----------+
        |   | Predicted | compare | Expected |
        |   |  Output y |<- - - ->| Ouput y  |
        |   +-----------+         +----------+
        |         |_____________________|
        |         v
        |   +-------------+
        |___| Error (loss)|
            +-------------+


    </script>

    </div>

    - <b>Unsupervised</b> (Unlabeled data): The data is the same type (Example: employee of a company: income vs job tenure). Data is grouped to see whether someone is on a fast track. Unsupervised Learning is all about discovery.

    <div class="typograms">
    <script type="text/typogram">

        +-----------------------+ 
        | Income vs job tenure  | 
        +-----------------------+ 

         60 
          ^
          |    x  /         xx
          |     x/  xx
          | xxx /
          |xx  /
    Income| xx/ xxxxx  xx
          |  /  xx xx xx
          | /  xxx   xxx
          |/          x
          +--------------------> 20 
                 Years

    The model is built to 
    categorize the raw data.


    </script>
    <script type="text/typogram">

        +-----------------------+ 
        | UNSUPERVISED LEARNING | 
        +-----------------------+ 
        
           +------------------+
           | Unlabeled data X |
           +------------------+
                   |
                   v
             +-----------+
             |   Model   |
             +-----------+
                   |
                   v
             +-----------+
             | Generated |
             |  Example  |
             +-----------+


    </script>

    </div>

    - <b>Deep learning (semi-supervised learning):</b> uses the neuron networks, which is inspired by the human brain, including many layers of connecting nodes or neurons. Deep learning is also called semi-supervised learning because there is a small amount of input data that is labeled to show the concepts of the data while the unlabeled data is called "black-box" that helps to make predictions.<br>

    <i id="genAI-definition">GenAI and Large Language Models (LLMs) are subsets of Deep Learning that uses artificial neuron networks.</i><br><br>

    1.2. <b>How many types of Deep Learning models</b>: 2 types, Discriminative & Generative models.

    - <b>Discriminative Model</b>: used to classify labels or predict new labels for data points. (discriminate between different kinds of data instances. For example: predict whether an input image is a dog or a cat.) 

    - <b>Generative AI Model (Gen AI model)</b>: can generate <b>new data instances or new contents</b> based on a learned probability distribution of existing data. (For example: generate an image of a dog, a new content of a language or a piece of audio)

2. <b>How generative AI works?</b>
    
    - Traditionally in order to distinguish a cat or a dog, we need a hard code: type animal, how many legs, ears, how is the fur, what he likes, dislikes...
    
    - With a wave of neuron network, we could give the network pictures of cats and dogs, then ask "is it a cat?", and it would predict or answer. It is very great that "we" here could be anyone of normal persons who can speak to or type a common language into a prompt. Some examples: model PaLM (Pathways Language Model), modelLaMDA (Language Model for Dialogue Applications)
    
    - Mathematically a model looks like this: $y = f(x)$ with $x$: input data, $y$: output data, $f$: model.
    
    - Training: the process of learning from the existing content and results in the creation of a statistical model. Particularly, the model learns the pattern of the existing data, so given some text, it can predict the next words. For ex: "I usually do morning exercise at ___", the model could predict "7am" as a next word due to its highest probability.

    - When given a prompt (an input content, like a question), Gen AI will use the statistical model to predict or generate a new content, that is similar to the data it was trained on.
    
    - The power of Gen AI comes from the use of transformers, which produced a 2018 revolution in NLP (natural language processing).

    <script type="text/typogram">
          Prompt: How's it going? 
        o===-=====================o
            |
            |
        +---|--------------------------+
        |   |     TRANSFORMER          |
        +---v--------------------------+
        | +----------+   +----------+  |      
        | | Encoding |-->| Decoding |  |
        | | Component|   | Component|  |
        | +----------+   +----------+  |
        +------------------------------+
                   |
                   v
        +------------------------+
        | Generative pre-trained |
        | transformer model      |
        +------------------------+
            Output |
                   v
        +-----------------------+
        | Alright, thanks for   |
        | asking. How are you?  |
        +-----------------------+

    </script>

    -  Sometimes Transformers produce issues called "Hallucinations", which are meaningless or grammatically incorrect. Reasons can be:
        - The trained data is not enough.
        - Data quality is too dirty.
        - Contexts are not enough.
        - Constraints are not enough.


3. <b>Describe generative AI model types?</b>

    - <b>Generative Image Models</b>: input is an image, the output can be text, image, video.

    - <b>Generative Language Models</b>: input is a text, the output can be text, image, audio or decisions.

    - <b>Text-to-text models</b>: take a text input and produce text output. These models are trained to learn the mapping a pair of text, for example, translating from one language to others.

    - <b>Text-to-image models</b>: take a large set of images, each tagged with a short text description. Diffusion is one method to achieve this. Additionally, we also have text-to-video or text-to-3D models.

    - <b>Text-to-task models</b>: perform a task or action based on text input request, which can be a wide range of actions, such as answering a question, performing a search, making a prediction.

    - <b>Foundation models</b>: a large AI model pre-trained on a vast quantity of data designed to be adapted or fine-tuned to a wide range of downstream tasks, such as sentiment analysis, image captioning, object recognition. Foundation models have the potential to revolutionize many industries, including healthcare, finance, and customer service.
    
        - Vertex AI offers a Model Garden of foundation models. The language foundation models include "PaLM API for chat", "PaLM API for text" and "BERT".
    
        - The vision foundation models could be "Stable Diffusion", which has been shown to be effective at generating high quality images from text input.


4. <b>Describe generative AI applications?</b>
    
    4.1. <b>Text</b>: Marketing content, Sales by email, Email chatting Support, General writing, Note taking,...
    
    4.2. <b>Code</b>: Code generation, Code documentation, Text to SQL, Web builders.

    4.3. <b>Image</b>: Image generation, Image Advertising, Design.

    4.4. <b>Speech</b>: Voice Synthesis.

    4.5. <b>Video</b>: Video editting/generation.

    4.6. <b>3D</b>: 3D models/scene.

    4.7. <b>Other</b>: Gaming, Robotic Automation, Music, Audio, Biology & Chemistry.

    For example: The Google Gemini code generation model can help:
        
        - Debug your code.
        - Explain your code line by line.
        - Craft SQL queries from you DB.
        - Translate code from one language to another.
        - Generate documentation and tutorials for your source code.

5. <b>Vertex AI Studio for developers</b>: 
    
    - Quickly explore and customize Gen AI models that you can leverage in your applications on Google Cloud.
    
    - Help developers create and deploy AI models.
        - A library of pre-trained models.
        - Tool for fine-tuning. 
        - Tool for deploping models to production.
        - Community forum for developers to share ideas and collaborate.     

    
<i>Remark: This post is based solely on Google documents, but I hope it helps highlight key terms used in the wide and magical world of Gen AI.</i>