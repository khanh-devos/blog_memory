---
category: ai
loadingMathjax: true
---

Common Types of AI architectures: 

AI technology has been "exploding" in recent years, introducing numerous new concepts and terms each year. Among these, AI architectures, in my view, play a key role in this evolution(sự tiến bộ). This post is my attempt to collect and describe some common AI architectures with their core typical features.


1. **FNN (Feedforward Neuron Network)** :
    - Foundational: FNNs are the simplest neural networks and provide a foundation for understanding how inputs, weights, biases, and activations work.
    - Broad Applicability: Useful for basic tasks like regression(phân tích hồi quy) and classification.
    - Techniques: Basics of how neural networks process data, activation functions, loss functions, and backpropagation(truyền ngược).

    <div style="width: 100%; text-align: center;">
      <img class="ai-images" src="{{ './assets/images/Feedforward-neural-network-FNN.png' | relative_url }}" alt="First transformer version" />
      <h5>Figure 1: regular FNN</h5>
    </div>

    - Input Layer $X$: This layer receives the raw data (features or inputs). Each node corresponds to one feature of the input data.
    - Hidden Layers $H_{j}$: These intermediate layers process the input using weights and biases $W$, that are initialized randomly between 0 and 1. Each node in a hidden layer applies an activation function ReLU and regularization technique  Dropout.
    - Output Layer $Y$: There are two nodes (0 & 1) at the end, so this architecture is for classification.
    - For each layer with input X and output Y, we have:

    $$Y = \alpha (W \cdot X + B)$$

    - With: 
        - $X$: input vector
        - $W$: weight matrix
        - $\alpha$: activation function
        - $Y$: layer ouputs<br><br>

    - Dropout: is a regularization technique to prevent overfitting. It works by randomly "dropping out" (setting to zero) a subset of neurons in a hidden layer during each training iteration. This makes the network learning more generally by not relying too heavily on specific neurons. Because "dropout" sets zero forcefully to some neurons at the "forward propagation" (truyền tới), it cannot be applied at the final layer.
    <br><br>

2. **Convolutional Neural Networks (CNNs)** :
    - Complexity: CNNs are a natural progression, especially for image-related data.
    - Practical Applications: Many real-world use cases (face recognition, medical imaging(2D, 3D), sentiment analysis).
    - Techniques: Filters, feature maps, pooling, and convolution(tích chập) operations. These terms should be clarified to master this CNN architecture.

    <div style="width: 100%; text-align: center;">
      <img class="ai-images" src="{{ './assets/images/CNN.png' | relative_url }}" alt="First transformer version" />
      <h5>Figure 2: Convolutional Neural Networks CNN</h5>
    </div>

    <div style="width: 100%; text-align: center;">
      <img class="ai-images" src="{{ './assets/images/convolution-illustration.png' | relative_url }}" alt="First transformer version" />
      <h5>Figure 2.1: Convolution process</h5>
    </div>

    2.1 Convolution: is a mathematical operation a kernel (a matrix or a filter) traverses over the image and performs a DOT product with each overlapping(phủ lên) areas, that is a matrix with same size. This DOT products are to extract important regional features on the image, but this is hardly understandable.

    2.2 Filter (kernel or a matrix): There might be various filters (kernels) applied to capture various aspects of the image. The more number filters, the more features extracted or the longer the flatten layer becomes. The initial layers extract edges and texture, and the final layers extract parts of an image like head, eyes, or a tail. CNN adjusts (learns) the filters during training to minimize the loss.

    2.3 Stride: the number of cells the kernel of filter traverse one time over the image.

    Explaination of Figure 2.1:<br>
    (5x-1)+(2x0)+(6x1)+(4x2)+(3x1)+(4x2)+(3x1)+(9x-2)+(2x0) = 5 (origin 3)<br>
    (2x-1)+(6x0)+(8x1)+(3x2)+(4x1)+(5x2)+(9x1)+(2x-2)+(4x0) = 31 (origin 4)<br>
    (6x-1)+(8x0)+(2x1)+(4x2)+(5x1)+(1x2)+(2x1)+(4x-2)+(7x0) = 5 (origin 5)<br>
    (8x-1)+(2x0)+(0x1)+(5x2)+(1x1)+(9x2)+(4x1)+(7x-2)+(7x0) = 11 (origin 1)<br>

    After convolution calculation with stride 1, the DOT product values are scaled up as following: 
    
    - 3-4-5-1 is replaced by 5-31-5-11.

    This convolution values definitely highlight the relative relationship across all the cells (pixels) in the image, improving the learning process. But as mentioned, kernel values are adjusted like "weights" during the training in most cases.

    2.4 Pooling Layers: After convolution operations, pooling takes place, which some times reduces the size of the "representation".

    2.5 Flatten layers: is to combine and reduce the size of all the pooling layers to 1-dimentional vector feeding the next "fully connected layer" that is similar to the FNN architecture.

    *Extension: There are various types of convolution operations, including dilated convolution, transposed convolution, depthwise separable convolution, deformable convolution. Generally, CNNs are used widely for tasks involving image-related data such as image recognition, video analysis.*


3. **Recurrent Neural Networks (RNNs)** :
    - Sequential Data: fit for time-series data, text, or speech.
    - Data Flow with BTTT (Backpropagarion Through Time): it is very similar to FNNs architectures but it includes loop over time, output from previous time steps are fed back into the network as input, making the learning process will have to 2 inputs. (*The feedback loop applies across the network as a whole*).

    $$ Y_{t} = \alpha (W_{x}X_{t} + W_{y}Y_{t-1} + B) $$

    - With:
        - $X_{t}$ : normal input at time step $t$
        - $W_{x}$, $W_{y}$ : weight matrices
        - $Y_{t-1}$ : previous input at time step $t-1$
        - $\alpha$ : activation function (sigmoid, tanh, ReLU)<br><br>
    
    - Difference: This feedback loop enables the network to maintain a form of memory, capturing "sequential dependencies" (sự phụ thuộc liên tục) in data.
    - Techniques included: Hidden states, vanishing gradients, and how LSTMs/GRUs improve on vanilla RNNs.
    <br><br>
    <div style="width: 100%; text-align: center;">
        <img class="ai-images" src="{{ './assets/images/RNNs.png' | relative_url }}" alt="First transformer version" />
        <h5>Figure 3: Recurrent Neural Networks RNNs</h5>
    </div>

    - Note: *Becaues the inputs are processed sequentially, which is slower compared to parallel architectures like Transformers. For very long sequence, the model could "forget" older information from the beginning time.*<br><br>


4. **Transformer Architectures** :
    - State-of-the-Art: Transformers dominate modern AI applications, especially in NLP (e.g., GPT, BERT).
    - High Demand: Skills in transformers are highly sought after in industry.
    - Techniques: Attention mechanisms, self-attention, and encoder-decoder architectures.
    <br><br>
    <div style="width: 100%; text-align: center;">
        <img class="ai-images" src="{{ './assets/images/Transformer.png' | relative_url }}" alt="First transformer version" />
        <h5>Figure 4: Transformer Architectures</h5>
    </div>

5. **Reinforcement Learning (RL)** :
    - Complexity: RL is conceptually and mathematically challenging.
    - Niche Applications: While powerful, its applications (e.g., robotics, game AI) are narrower compared to others.
    - Techniques: Markov Decision Processes, policies, rewards, and exploration/exploitation trade-offs.
    <br><br>
    <div style="width: 100%; text-align: center;">
        <img class="ai-images" src="{{ './assets/images/Reinforcement.png' | relative_url }}" alt="First transformer version" />
        <h5>Figure 5: Reinforcement Learning</h5>
    </div>


6. **Graph Neural Networks (GNNs)** :
    - GNN is designed to work directly on ***graph-structured data***. Graphs consist of nodes (vertices) and edges, making them ideal for representing relationships between entities, such as social networks, molecules, transportation networks, or recommendation systems.
    - ***Graphs***: have a non-Euclidean structure, meaning they don't fit neatly into grids or sequences.
    - GNNs overcome this limitation by learning to represent and process data with irregular connections and relationships.
    <br><br>
    <div style="width: 100%; text-align: center;">
        <img class="ai-images" src="{{ './assets/images/GNNs.png' | relative_url }}" alt="First transformer version" />
        <h5>Figure 6: Graph Neural Networks (GNNs)</h5>
    </div>

**Additional Recommendations :**
- For interests in generative AI, such as creating images or videos, consider Generative Adversarial Networks (GANs) after mastering CNNs.
- If you’re working with low data, delve into Few-Shot Learning Models.