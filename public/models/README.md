# 3D Models Directory

This directory contains 3D models for the Features section of the KANTES landing page.

## File Structure

Place your 3D model files here with the following naming convention:

```
/public/models/
  ├── text-to-bim.glb
  ├── visualization.glb
  ├── construction-drawing.glb
  └── export-cad.glb
```

## Model Mappings

| Feature | Filename | Description |
|---------|----------|-------------|
| Text-to-BIM | `text-to-bim.glb` | 3D model showing BIM generation |
| Architectural Visualization | `visualization.glb` | 3D model showing rendering process |
| Construction Drawing Automation | `construction-drawing.glb` | 3D model showing documentation |
| Export to BIM/CAD Software | `export-cad.glb` | 3D model showing export process |

## Recommended Formats

- **GLB** (preferred): Single-file binary GLTF format
- **GLTF**: JSON-based format with separate textures
- **USDZ**: For AR/iOS compatibility (optional)

## File Size Guidelines

- Target: < 2MB per model (optimized)
- Maximum: < 5MB per model
- Use compression and optimize meshes before uploading

## Tools for Optimization

- **gltf-pipeline**: Command-line tool for GLB optimization
- **Blender**: Export with Draco compression
- **Spline**: Export optimized models directly

## Integration

Models are loaded in `/components/sections/Features.tsx`:
- Each feature card has a 3D canvas area
- Models can be integrated using:
  - Spline (if exported from Spline)
  - React Three Fiber + @react-three/drei
  - Three.js GLTFLoader

## Usage

Once models are placed here, they'll be accessible at:
```
/models/text-to-bim.glb
/models/visualization.glb
/models/construction-drawing.glb
/models/export-cad.glb
```
