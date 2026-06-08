import React from "react";

export function DashboardCharts() {
  return (
    <div className="dashboard-bottom-grid">
      <div className="dashboard-chart-card">
        <div className="dashboard-section-title">Clicks — last 7 days</div>
        <div className="dashboard-section-sub">Daily click activity</div>
        <div className="dashboard-chart-bars">
          <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '34px'}}></div><span className="dashboard-bar-lbl">M</span></div>
          <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '52px'}}></div><span className="dashboard-bar-lbl">T</span></div>
          <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '28px'}}></div><span className="dashboard-bar-lbl">W</span></div>
          <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '62px'}}></div><span className="dashboard-bar-lbl">T</span></div>
          <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '44px'}}></div><span className="dashboard-bar-lbl">F</span></div>
          <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '70px'}}></div><span className="dashboard-bar-lbl">S</span></div>
          <div className="dashboard-bar-col"><div className="dashboard-bar today" style={{height: '38px'}}></div><span className="dashboard-bar-lbl" style={{color: '#534AB7', fontWeight: 500}}>S</span></div>
        </div>
      </div>

      <div className="dashboard-top-links-card">
        <div className="dashboard-section-title">Top links</div>
        <div className="dashboard-section-sub">By total clicks</div>
        <div style={{marginTop: '12px'}}>
          <div className="dashboard-top-link-row">
            <span className="dashboard-rank">1</span>
            <span className="dashboard-tl-code">sho.rt/a3xf</span>
            <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '100%'}}></div></div>
            <span className="dashboard-tl-count">91</span>
          </div>
          <div className="dashboard-top-link-row">
            <span className="dashboard-rank">2</span>
            <span className="dashboard-tl-code">sho.rt/b7kq</span>
            <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '48%'}}></div></div>
            <span className="dashboard-tl-count">44</span>
          </div>
          <div className="dashboard-top-link-row">
            <span className="dashboard-rank">3</span>
            <span className="dashboard-tl-code">sho.rt/c1mz</span>
            <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '30%'}}></div></div>
            <span className="dashboard-tl-count">27</span>
          </div>
          <div className="dashboard-top-link-row">
            <span className="dashboard-rank">4</span>
            <span className="dashboard-tl-code">sho.rt/d9pv</span>
            <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '20%'}}></div></div>
            <span className="dashboard-tl-count">18</span>
          </div>
        </div>
      </div>
    </div>
  );
}
