---
tools:
  - read
  - write
  - edit
  - bash
arguments: $FILENAME
---

# Semantic Tree Import

Import a previously exported semantic tree to restore memory, continue work, or share knowledge.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Validate Import File**
   - Locate file: "$FILENAME" in `./exports/` or provided path
   - Detect format from extension or content:
     * `.txt`: Plain text WFGY export
     * `.json`: JSON structured export
   - Verify file header and version compatibility
   - Check for corruption or tampering (checksum if available)

2. **Parse Tree Data**
   - Extract metadata:
     * Tree name and ID
     * Export date and version
     * Node count and statistics
   - Parse nodes based on format:
     * TXT: Split by delimiter, parse fields
     * JSON: Direct object parsing
   - Validate node structure:
     * Required fields present
     * Valid ΔS values (0.0 - 1.0)
     * Valid λ symbols (→←<>×)
     * Valid modules (BBMC/BBPF/BBCR/BBAM)

3. **Check for Conflicts**
   - Search for existing tree with same name
   - If exists, offer options:
     * Replace existing tree
     * Merge with existing (append nodes)
     * Create with new name (auto-suffix)
     * Cancel import
   - Check for duplicate node IDs
   - Verify relationship integrity

4. **Import Tree Structure**
   - Create tree file in `.wfgy/trees/`
   - Import nodes in chronological order
   - Rebuild relationships:
     * Parent-child connections
     * Cross-references
     * Bridge connections
   - Reconstruct indices
   - Restore checkpoints if present

5. **Post-Import Processing**
   - Recalculate statistics:
     * Total/average ΔS
     * Module distribution
     * Tree depth
   - Rebuild search indices
   - Verify relationship integrity
   - Update `.wfgy/trees/registry.json`
   - Log import in `.wfgy/logs/imports.log`

6. **Activation Options**
   - Ask to activate imported tree:
     * Yes: Set as active tree
     * No: Keep current active tree
   - Update `.wfgy/context.json` if activated
   - Create import report

## Output Format

```
Semantic Tree Import Successful
═══════════════════════════════════════
Imported Tree: [name]
Source File: $FILENAME
Import Date: [timestamp]

Import Statistics:
- Nodes Imported: [count]/[total]
- Time Range: [first] to [last]
- File Version: [version]
- Compatibility: ✓ Full

Tree Analysis:
- Average ΔS: [value]
- Primary Module: [BBMC/BBPF/BBCR/BBAM]
- Max Depth: [value]
- Branches: [count]

Validation Results:
✓ Header valid
✓ Nodes structure correct
✓ Relationships preserved
✓ No conflicts detected

Tree Status: [Active/Inactive]

Next Steps:
1. View imported tree: /semantic:tree-view
2. Continue building: /semantic:node-build
3. Switch to tree: /semantic:tree-switch "[name]"
```

## Import Modes

### Replace Mode
```bash
/semantic:tree-import "backup.txt" --replace
```
Overwrites existing tree with same name

### Merge Mode
```bash
/semantic:tree-import "additional.txt" --merge
```
Appends nodes to existing tree

### Safe Mode (Default)
```bash
/semantic:tree-import "tree.txt"
```
Creates new tree, auto-renames if conflict

## Error Handling

Common issues and solutions:

**Version Mismatch**
```
Warning: File version 0.9.0, current 1.0.0
Attempting compatibility mode...
[List of adjusted fields]
```

**Corrupted Nodes**
```
Error: Node 45 has invalid structure
Options:
1. Skip corrupted nodes
2. Attempt repair
3. Cancel import
```

**Missing Relationships**
```
Warning: 3 nodes reference missing parents
Auto-creating placeholder nodes...
```

## Compatibility

Supports imports from:
- WFGY v0.9.0 and higher
- Other WFGY-compatible systems
- Partial trees (with warnings)
- Compressed exports

## Advanced Options

```bash
# Import and activate immediately
/semantic:tree-import "tree.txt" --activate

# Import with validation only (dry run)
/semantic:tree-import "tree.txt" --validate-only

# Import specific date range
/semantic:tree-import "tree.txt" --from "2024-01-01" --to "2024-01-31"

# Import and merge with existing
/semantic:tree-import "tree.txt" --merge --tree "Existing Tree"
```