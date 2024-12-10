---
category: ai
loadingMathjax: true
---

In AI and Machine Learning, distributions are often used to model binary outcomes (e.g., success/failure, yes/no, true/false).

1. Common Features of Probability:
    
    1.1 **Values**: between 0 and 1: $0 \le P(A) \le 1$, "1" means event A is certain to happen.
    
    1.2 **Sum rule**: if two events A and B cannot happen at the same time, the probability to for A or B to happen is:

    $$P(A \cup B) = P(A) + P(B)$$

    1.3 **General Addition Rule**: for any two events A and B, the probability to for A or B to happen is: 

    $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

    (Need to subtract $P(A \cap B)$, which is probability of A and B to happen at the same time.)

    1.4 **Multiplication Rule**: for independent events A and B to happen concurrently.

    $$P(A \cap B) = P(A) \cdot P(B)$$

    1.5 **Total probability**: if A happens based on several independent events (scenarios) $B_{1}, B_{2},.. , B_{n}$, the total probability of A to happen is:

    $$P(A) = \sum_{i=1}^{n} P(A \cap B_{i}) = \sum_{i=1}^{n} P(A|B_{i})P(B_{i})$$

    1.6 **Conditional Probability**: when events A and B are dependent somehow, probability for A to happen with presence of B:

    $$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

    *Note: $P(A \cap B) \lt P(A)P(B)$ because A and B are not independent.*

    1.7 **Bayes Theorem**: for conditional probabilities:

    $$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$

    This is a very interesting example I have from AI:

    A medical detection for a rare disease shows that:
    - The disease occurs in 1% of the population ($P(infected)$ = 0.01).
    - Sensitivity (probability of positiveness of the infected patients): $P(positive \| infected) = 0.99$
    - False Positive (probability of positiveness of the non-infected or normal persons): $P(positive \| infected) = 0.05$

    My test result is positive. The question is what is the probability that I am truly infected ? Is it 100% that I am infected ?
    
    Calculate the total probability of positiveness:

    $$P(positive) = P(positive|infected)P(infected) + P(positive|nonInfected)P(nonInfected)$$

    Substituting:

    $$P(positive) = (0.99 \cdot 0.01) + (0.05 \cdot 0.99) = 0.0594$$

    Apply Bayes'theorem for my probability to get infected:

    $$P(infected|positive) = \frac{P(positive|infected)P(infected)}{P(positive)} = \frac{0.99 \cdot 0.01}{0.0594} = 0.1667$$

    So the probability for me to get infected is just 17%. Wow!!

    1.8 **Law of large numbers**: over many trials, the relative frequency of an event converges to its true probability.

    1.9 **Probabilistic Expectation (KỲ VỌNG)**: The expected value (mean) of a random event quantifies the average outcome:

    $$\mathbb E[X] = \sum_{i} X_{i} \cdot P(X_{i}) \ \ (rời \ rạc, \ discrete)$$

    $$\mathbb E[X] = \int_{- \infty}^{\infty} X \cdot f(X) \ \ (liên \ tục, \ continuous)$$

    <br><br>
2. **Bernoulli Distribution :** a single random variable $X$ that can take one of two possible outcomes:
    - $X = 1$ with probability $p$ (success)
    - $X = 0$ with probability $1-p$ (failure)
    - Mathematically, the "probability mass function" is:

    $$P(X=x) = p^{x} \cdot (1-p)^{1-x} \ \ with \ x \in \bigl\{ 0,1 \bigl\}$$

    With characteristics:
    - a. Mean (expected values): The mean of a Bernoulli random variable X is the probability of success
    
    $$\ \mathbb E[X] = \sum_{x \in \bigl\{ 0,1 \bigl\}} x \cdot P(x)$$

    $$\to \ \ \mathbb E[X] = 0 \cdot (1-p) + 1 \cdot p = p$$

    - b. Variance: The variance measures the spread of the distribution

    $$\ Var(X) = \mathbb E[(X- \mathbb E[X])^{2}] = \mathbb E[X^{2}] - (\mathbb E[X])^{2}$$

    With $\ X^{2} = X \ so \ \mathbb E[X^{2}] = \mathbb E[X] = p$

    $$\to Var(X) = p - p^{2} = p (1-p)$$