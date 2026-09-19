import {
  Brain,
  ChevronRight,
  CircleDot,
  Layers3,
  Scan,
  Settings2,
} from "lucide-react";

import ThreeDViewer from "./components/ThreeDViewer";

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Brain size={19} />
          </div>

          <div>
            <div className="brand-name">SCAN EXPLORER</div>
            <div className="brand-subtitle">
              NEUROIMAGING RESEARCH PLATFORM
            </div>
          </div>
        </div>

        <div className="topbar-status">
          <span className="status-dot" />
          DEMO DATA
        </div>
      </header>

      <main className="workspace">
        <aside className="sidebar">
          <div className="section-label">CASE</div>

          <div className="case-card active">
            <div className="case-icon">
              <Scan size={18} />
            </div>

            <div className="case-info">
              <strong>CASE 001</strong>
              <span>Brain MRI</span>
            </div>

            <ChevronRight size={16} />
          </div>

          <div className="section-label second">STRUCTURES</div>

          <button className="layer-row">
            <span className="layer-indicator brain" />
            Brain
          </button>

          <button className="layer-row">
            <span className="layer-indicator tumor" />
            Tumor
          </button>

          <button className="layer-row">
            <span className="layer-indicator vessels" />
            Vessels
          </button>

          <div className="sidebar-bottom">
            <button className="settings-button">
              <Settings2 size={17} />
              Viewer settings
            </button>
          </div>
        </aside>

        <section className="viewer-area">
          <div className="viewer-header">
            <div>
              <div className="viewer-title">
                CASE 001
              </div>

              <div className="viewer-description">
                Brain MRI · Research visualization
              </div>
            </div>

            <div className="viewer-tools">
              <button>
                <CircleDot size={15} />
                Crosshair
              </button>

              <button>
                <Layers3 size={15} />
                Layers
              </button>
            </div>
          </div>

          <div className="viewer-grid">
            <div className="scan-panel large">
              <div className="panel-label">
                AXIAL
              </div>

              <div className="scan-placeholder">
                <Brain size={58} strokeWidth={1} />

                <span>
                  Axial imaging view
                </span>

                <small>
                  Demo volume
                </small>
              </div>
            </div>

            <div className="scan-panel">
              <div className="panel-label">
                CORONAL
              </div>

              <div className="scan-placeholder">
                <Brain size={42} strokeWidth={1} />

                <span>
                  Coronal view
                </span>
              </div>
            </div>

            <div className="scan-panel">
              <div className="panel-label">
                SAGITTAL
              </div>

              <div className="scan-placeholder">
                <Brain size={42} strokeWidth={1} />

                <span>
                  Sagittal view
                </span>
              </div>
            </div>

            <div className="scan-panel three-d">
              <div className="panel-label">
                3D RECONSTRUCTION
              </div>

              <ThreeDViewer />
            </div>
          </div>
        </section>

        <aside className="case-panel">
          <div className="section-label">
            CASE INFORMATION
          </div>

          <h1>Brain MRI</h1>

          <p className="case-description">
            Interactive visualization of a
            de-identified neuroimaging case.
          </p>

          <div className="metadata">
            <div>
              <span>MODALITY</span>
              <strong>MRI</strong>
            </div>

            <div>
              <span>REGION</span>
              <strong>BRAIN</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong>DEMO</strong>
            </div>
          </div>

          <div className="tumor-summary">
            <div className="summary-icon">
              <CircleDot size={18} />
            </div>

            <div>
              <span>SEGMENTATION</span>
              <strong>Available</strong>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
