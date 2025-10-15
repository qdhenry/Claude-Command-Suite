# Optimize Prompt for Token Efficiency

Takes an input prompt and returns ONLY a token-optimized version that preserves meaning while minimizing token count. Based on LLM tokenization principles: common words tokenize more efficiently, unusual words break into more tokens, and conciseness reduces cost.

**Output Format**: Return only the optimized prompt text with no additional commentary, analysis, or explanation.

## Instructions

### 1. **Analyze Input Prompt**

- Extract the prompt from `$ARGUMENTS` using the `--prompt` flag (format: `--prompt "your prompt text"`)
- Identify current token inefficiencies:
  - Verbose or redundant phrasing
  - Unusual/rare words that break into multiple tokens
  - Unnecessary qualifiers and filler words
  - Repetitive statements
  - Overly formal language when casual works
- Estimate current token count based on word complexity and frequency

### 2. **Apply Token Optimization Techniques**

Apply these optimization strategies systematically:

**Conciseness**

- Remove filler words (just, really, very, actually, basically)
- Eliminate redundant phrases
- Use active voice instead of passive
- Combine related ideas into single statements

**Word Choice**

- Replace rare/unusual words with common alternatives
- Use shorter synonyms when meaning is preserved
- Prefer common technical terms over obscure ones
- Avoid unnecessarily complex vocabulary

**Structure**

- Remove unnecessary introductions/conclusions
- Use direct imperatives instead of questions
- Eliminate meta-commentary about the prompt itself
- Consolidate multi-sentence ideas when possible

**Examples**

- Before: "Could you please help me understand how to..."
- After: "Explain how to..."

- Before: "I would really appreciate it if you could analyze..."
- After: "Analyze..."

- Before: "utilizing sophisticated methodology"
- After: "using advanced methods"

### 3. **Preserve Critical Elements**

While optimizing, ensure you maintain:

- **Core meaning and intent** - Don't change what's being asked
- **Essential context** - Keep details needed for accurate response
- **Technical specificity** - Preserve domain-specific terms when needed
- **Clarity** - Optimized version must be unambiguous

### 4. **Return Optimized Prompt**

Return ONLY the optimized prompt text with no analysis, summary, or explanation.

Do not include:

- Analysis of inefficiencies
- Optimization summary
- Changes made
- Token savings estimates
- Key improvements
- Any other commentary

Simply return the token-optimized version of the prompt.

### 5. **Validation**

Before returning, verify the optimized prompt:

- ✅ Preserves original intent and meaning
- ✅ Maintains necessary context and details
- ✅ Uses more common/efficient word choices
- ✅ Eliminates redundancy and verbosity
- ✅ Remains clear and unambiguous

**IMPORTANT**: After validation, return ONLY the optimized prompt text. Do not include this checklist, analysis, or any explanatory text in your response.

## Token Optimization Principles

Based on how LLM tokenizers work:

1. **Common words = fewer tokens** - Frequent words in training data tokenize more efficiently
2. **Rare words = more tokens** - Unusual words break into multiple sub-word tokens
3. **Languages matter** - Less common languages/dialects use more tokens
4. **Code languages differ** - JavaScript tokenizes more efficiently than Haskell
5. **Token count = cost** - Every token in input and output costs money

## Usage

```bash
/dev:optimize-prompt --prompt "Please could you help me to understand the various different methodologies and approaches that could potentially be utilized when implementing a comprehensive authentication system"
```

Returns:

```
Explain methods for implementing authentication systems
```

Example 2:

```bash
/dev:optimize-prompt --prompt "I need you to create commits and branches that culminate into a sensible release. I also need you to add model:inherit to agent files that do not have a model decleared in the frontmatter yaml"
```

Returns:

```
Create commits and branches for release. Add model:inherit to agent frontmatter missing model declaration.
```

## Notes

- This command focuses on reducing token count while preserving meaning
- For creative writing, may want to preserve style over efficiency
- Technical prompts often benefit most from optimization
- Test optimized prompts to ensure they produce desired results
