#!/usr/bin/env bash
# Helpers for invoking Bun from Git Bash/MSYS while preserving a Windows-style
# PATH for child processes spawned by Bun tests.

resolve_bun_cmd() {
  local bun_path
  bun_path="$(command -v bun 2>/dev/null || true)"
  if [ -n "$bun_path" ]; then
    printf '%s\n' "$bun_path"
    return
  fi
  if command -v cygpath >/dev/null 2>&1 && [ -n "${USERPROFILE:-}" ]; then
    local fallback
    fallback="$(cygpath -u "$USERPROFILE" 2>/dev/null)/.bun/bin/bun.exe"
    if [ -x "$fallback" ]; then
      printf '%s\n' "$fallback"
      return
    fi
  fi
  printf '%s\n' bun
}

resolve_bun_child_path() {
  local current_path="$PATH"
  if command -v cygpath >/dev/null 2>&1; then
    local bun_path
    bun_path="$(resolve_bun_cmd)"
    if [ -n "$bun_path" ]; then
      local bun_dir_win
      bun_dir_win="$(cygpath -w "$(dirname "$bun_path")" 2>/dev/null || true)"
      local system_root_win="${SystemRoot:-${WINDIR:-C:\\Windows}}"
      if [ -n "$bun_dir_win" ]; then
        local shim_dir=".context/test-bin"
        mkdir -p "$shim_dir" 2>/dev/null || true
        if [ -f "$bun_path" ] && [ ! -f "$shim_dir/bun" ]; then
          cp "$bun_path" "$shim_dir/bun" 2>/dev/null || true
          chmod +x "$shim_dir/bun" 2>/dev/null || true
        fi
        local shim_dir_win
        shim_dir_win="$(cygpath -w "$shim_dir" 2>/dev/null || true)"
        local git_paths=""
        for git_dir in \
          "/c/Program Files/Git/cmd" \
          "/c/Program Files/Git/bin" \
          "/c/Program Files/Git/usr/bin"
        do
          if [ -d "$git_dir" ]; then
            local git_dir_win
            git_dir_win="$(cygpath -w "$git_dir" 2>/dev/null || true)"
            if [ -n "$git_dir_win" ]; then
              git_paths="${git_paths:+$git_paths;}$git_dir_win"
            fi
          fi
        done
        current_path="$shim_dir_win;$bun_dir_win${git_paths:+;$git_paths};$system_root_win\\System32;$system_root_win"
      fi
    fi
  fi
  printf '%s' "$current_path"
}
