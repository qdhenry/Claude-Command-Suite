---
tools:
  - read
  - write
  - edit
  - bash
  - glob
---

# WFGY System Initialization

Initialize the complete WFGY (WanFaGuiYi) semantic reasoning system with all core mathematical modules for enhanced AI reasoning and memory.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Initialize Core Formula Modules**
   - Set up BBMC (Semantic Residue Minimization): B = I - G + m * c²
   - Configure BBPF (Multi-Path Progression) for parallel reasoning paths
   - Enable BBCR (Collapse-Rebirth Correction) with threshold B_c = 0.85
   - Activate BBAM (Attention Modulation) with modulation factor γ = 0.618
   - Store configuration in `.wfgy/config.json`

2. **Create Semantic Memory Structure**
   - Initialize primary semantic tree ("A Tree")
   - Set ΔS threshold = 0.6 for automatic node recording
   - Configure λ_observe tracking: → (convergent), ← (divergent), <> (recursive), × (chaotic)
   - Create `.wfgy/trees/` directory for persistent tree storage
   - Initialize context tracking in `.wfgy/context.json`

3. **Activate Knowledge Boundary Detection**
   - Configure risk zones:
     * Safe Zone: ΔS < 0.4 (high confidence)
     * Transitional: 0.4 ≤ ΔS ≤ 0.6 (moderate confidence)
     * Risk Zone: 0.6 < ΔS < 0.85 (low confidence)
     * Danger Zone: ΔS ≥ 0.85 (hallucination risk)
   - Enable automatic BBCR fallback for danger zones
   - Initialize boundary heatmap in `.wfgy/boundaries/heatmap.json`
   - Create knowledge map in `.wfgy/boundaries/knowledge_map.json`

4. **System Verification**
   - Run self-test with sample inputs
   - Verify all four modules (BBMC, BBPF, BBCR, BBAM) responding
   - Test semantic tension calculation
   - Validate tree recording functionality
   - Display initialization status summary

5. **Documentation and Logging**
   - Generate `.wfgy/README.md` with system architecture
   - Record initialization parameters and timestamps
   - Create `.wfgy/logs/init.log` with detailed startup log
   - Document active configuration and thresholds

## Configuration Output

The system will create:
```
.wfgy/
├── config.json          # System configuration and thresholds
├── context.json         # Current reasoning context
├── trees/
│   └── A_Tree.json      # Default semantic tree
├── boundaries/
│   ├── heatmap.json     # Knowledge boundary heatmap
│   └── knowledge_map.json # Known concept mappings
├── logs/
│   └── init.log         # Initialization log
└── README.md            # System documentation
```

## Usage

After initialization:
```bash
# Apply all formulas to complex reasoning
/wfgy:formula-all "Your complex reasoning task"

# Build semantic memory nodes
/semantic:node-build

# View your semantic tree
/semantic:tree-view

# Check knowledge boundaries
/boundary:detect "uncertain topic"
```

## Performance Benchmarks

Based on WFGY testing:
- Reasoning accuracy improvement: +22.4%
- Chain validity improvement: +42.1%
- Stability increase: 3.6×
- Hallucination reduction: Significant

## Credit

This system is based on the innovative WFGY (WanFaGuiYi) project.
Repository: https://github.com/onestardao/WFGY