interface DriverDetailsProps {
  email: string;
  licenseNumber: string;
  vehicleType: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saving: boolean;
  handleSave: () => void;
  error: string;
  form: { experienceYears: number | string; languages: string; routesOperated: string };
  setForm: (form: { experienceYears: number | string; languages: string; routesOperated: string }) => void;
}

export function DriverDetails({
  email,
  licenseNumber,
  vehicleType,
  isEditing,
  setIsEditing,
  saving,
  handleSave,
  error,
  form,
  setForm
}: DriverDetailsProps) {
  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md shadow-xl relative overflow-hidden">
      {/* Subtle gradient effect in the corner */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#ea580c]/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-2xl font-bold text-slate-100">Driver Profile</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-slate-200 px-4 py-2.5 rounded-xl font-medium transition-colors border border-white/10 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white font-medium transition-colors px-4 py-2">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-orange-600/30 transition-all disabled:opacity-70">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium relative z-10">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
        
        {/* Read Only Info Block */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Driver Email</label>
            <div className="text-lg font-medium text-slate-200 bg-slate-900/30 px-4 py-3 rounded-xl border border-transparent">{email}</div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">License Number</label>
              <div className="text-lg font-medium text-slate-200 bg-slate-900/30 px-4 py-3 rounded-xl border border-transparent">{licenseNumber}</div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Vehicle Type</label>
              <div className="text-lg font-medium text-slate-200 bg-slate-900/30 px-4 py-3 rounded-xl border border-transparent">{vehicleType}</div>
            </div>
          </div>
        </div>

        {/* Editable Block */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Experience (Years)</label>
            {isEditing ? (
              <input 
                type="number" 
                value={form.experienceYears}
                onChange={e => setForm({...form, experienceYears: e.target.value})}
                placeholder="e.g. 5"
                className="w-full bg-slate-900/60 border border-orange-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-all focus:ring-1 focus:ring-orange-500"
              />
            ) : (
              <div className="text-lg font-medium text-slate-200 bg-slate-900/30 px-4 py-3 rounded-xl border border-white/5">
                {form.experienceYears ? `${form.experienceYears} Years` : <span className="text-slate-500 italic">Not set</span>}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Spoken Languages</label>
            {isEditing ? (
              <div>
                <input 
                  type="text"
                  value={form.languages}
                  onChange={e => setForm({...form, languages: e.target.value})}
                  placeholder="Nepali, Hindi, English..."
                  className="w-full bg-slate-900/60 border border-orange-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-all focus:ring-1 focus:ring-orange-500"
                />
                <p className="text-xs text-slate-500 mt-2 ml-1">Separate languages with commas.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 p-1">
                {form.languages ? form.languages.split(',').map((l, i) => (
                  <span key={i} className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm font-medium text-slate-200 shadow-sm">
                    {l.trim()}
                  </span>
                )) : (
                  <div className="text-slate-500 italic bg-slate-900/30 px-4 py-3 rounded-xl border border-white/5 w-full">
                    No languages listed yet.
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Routes Operated</label>
            {isEditing ? (
              <div>
                <input 
                  type="text"
                  value={form.routesOperated}
                  onChange={e => setForm({...form, routesOperated: e.target.value})}
                  placeholder="Darjeeling-NJP, Town Sightseeing..."
                  className="w-full bg-slate-900/60 border border-orange-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-all focus:ring-1 focus:ring-orange-500"
                />
                <p className="text-xs text-slate-500 mt-2 ml-1">Separate routes with commas.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 p-1">
                {form.routesOperated ? form.routesOperated.split(',').map((r, i) => (
                  <span key={i} className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm font-medium text-slate-200 shadow-sm">
                    {r.trim()}
                  </span>
                )) : (
                  <div className="text-slate-500 italic bg-slate-900/30 px-4 py-3 rounded-xl border border-white/5 w-full">
                    No routes listed yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
