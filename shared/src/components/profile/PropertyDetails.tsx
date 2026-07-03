interface PropertyDetailsProps {
  email: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saving: boolean;
  handleSave: () => void;
  error: string;
  form: { location: string; basePrice: string; amenities: string };
  setForm: (form: { location: string; basePrice: string; amenities: string }) => void;
}

export function PropertyDetails({
  email,
  isEditing,
  setIsEditing,
  saving,
  handleSave,
  error,
  form,
  setForm
}: PropertyDetailsProps) {
  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md shadow-xl relative overflow-hidden">
      {/* Subtle gradient effect in the corner */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#B48530]/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-2xl font-bold">Property Details</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl font-medium transition-colors border border-white/10 shadow-sm">
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
            <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-[#B48530] to-[#996F25] hover:from-[#C59640] hover:to-[#A87B2C] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#B48530]/20 transition-all disabled:opacity-70">
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
        
        {/* Info Block */}
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Host Email</label>
            <div className="text-lg font-medium text-slate-200 bg-slate-900/30 px-4 py-3 rounded-xl border border-transparent">{email}</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Location / Address</label>
            {isEditing ? (
              <input 
                type="text" 
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
                placeholder="e.g. Mall Road, Darjeeling"
                className="w-full bg-slate-900/60 border border-[#B48530]/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#B48530] transition-all focus:ring-1 focus:ring-[#B48530]"
              />
            ) : (
              <div className="text-lg font-medium text-slate-200 bg-slate-900/30 px-4 py-3 rounded-xl border border-white/5">
                {form.location || <span className="text-slate-500 italic">Not set</span>}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Base Price (₹ per night)</label>
            {isEditing ? (
              <input 
                type="number" 
                value={form.basePrice}
                onChange={e => setForm({...form, basePrice: e.target.value})}
                placeholder="2500"
                className="w-full bg-slate-900/60 border border-[#B48530]/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#B48530] transition-all focus:ring-1 focus:ring-[#B48530]"
              />
            ) : (
              <div className="text-lg font-medium text-slate-200 bg-slate-900/30 px-4 py-3 rounded-xl border border-white/5">
                {form.basePrice ? `₹${form.basePrice}` : <span className="text-slate-500 italic">Not set</span>}
              </div>
            )}
          </div>
        </div>

        {/* Amenities Block */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-widest">Amenities Provided</label>
          {isEditing ? (
            <div>
              <textarea 
                value={form.amenities}
                onChange={e => setForm({...form, amenities: e.target.value})}
                placeholder="WiFi, Heater, Breakfast, Parking..."
                rows={6}
                className="w-full bg-slate-900/60 border border-[#B48530]/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#B48530] transition-all resize-none focus:ring-1 focus:ring-[#B48530]"
              />
              <p className="text-xs text-slate-500 mt-2 ml-1">Separate amenities with commas.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 p-1">
              {form.amenities ? form.amenities.split(',').map((a, i) => (
                <span key={i} className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm font-medium text-slate-200 shadow-sm">
                  {a.trim()}
                </span>
              )) : (
                <div className="text-slate-500 italic bg-slate-900/30 px-4 py-3 rounded-xl border border-white/5 w-full">
                  No amenities listed yet.
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
