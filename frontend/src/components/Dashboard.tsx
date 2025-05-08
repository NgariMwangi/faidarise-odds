import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { deepPurple } from '@mui/material/colors';
import SportsSoccer from '@mui/icons-material/SportsSoccer';
import SportsTennis from '@mui/icons-material/SportsTennis';
import SportsBasketball from '@mui/icons-material/SportsBasketball';
import Logout from '@mui/icons-material/Logout';
import Casino from '@mui/icons-material/Casino';
import { jwtDecode } from 'jwt-decode';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

interface Match {
  sport_type: string;
  home_team: string;
  away_team: string;
  odds: string[];
}

interface SportGroup {
  name: string;
  matches: Match[];
  expanded: boolean;
}

const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

const getSportIcon = (sportType: string) => {
  switch(sportType.toLowerCase()) {
    case 'soccer': return <SportsSoccer />;
    case 'table-tennis': 
    case 'tennis': return <SportsTennis />;
    case 'basketball': return <SportsBasketball />;
    default: return <Casino />;
  }
};

const getSportDisplayName = (sportType: string) => {
  switch(sportType.toLowerCase()) {
    case 'soccer': return 'Soccer';
    case 'table-tennis': return 'Table Tennis';
    case 'tennis': return 'Tennis';
    case 'basketball': return 'Basketball';
    default: return sportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
};

const Dashboard: React.FC = () => {
  const [sportGroups, setSportGroups] = useState<SportGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      window.location.href = '/';
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/odds', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: Match[] = await response.json();
        
        // Group matches by sport_type
        const grouped = result.reduce((groups: Record<string, Match[]>, match) => {
          const key = match.sport_type;
          if (!groups[key]) {
            groups[key] = [];
          }
          groups[key].push(match);
          return groups;
        }, {});

        // Convert to SportGroup array with initial expanded state
        const sportGroupsArray = Object.entries(grouped).map(([name, matches]) => ({
          name,
          matches,
          expanded: true // Default to expanded
        }));

        setSportGroups(sportGroupsArray);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const toggleGroup = (groupName: string) => {
    setSportGroups(prevGroups => 
      prevGroups.map(group => 
        group.name === groupName 
          ? { ...group, expanded: !group.expanded } 
          : group
      )
    );
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: deepPurple[500] }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
        <IconButton onClick={() => window.location.reload()} sx={{ color: deepPurple[500] }}>
          <Typography sx={{ mr: 1 }}>Retry</Typography>
          <Casino />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f5f7fa 0%, #e4e8f0 100%)',
      p: 4
    }}>
      <Box sx={{
        maxWidth: 1200,
        mx: 'auto',
        mb: 6
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              bgcolor: deepPurple[500],
              mr: 2,
              width: 48,
              height: 48
            }}>
              <Casino />
            </Avatar>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #5c6bc0 30%, #3949ab 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Odds Place
            </Typography>
          </Box>
          <Tooltip title="Logout">
            <IconButton 
              onClick={handleLogout}
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': { bgcolor: deepPurple[50] }
              }}
            >
              <Logout color="action" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Dashboard Content */}
        <Card sx={{ 
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 3,
              fontWeight: 600,
              color: 'text.primary'
            }}>
              Today's Matches by Sport
            </Typography>
            
            {sportGroups.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 200 
              }}>
                <Typography variant="body1" color="text.secondary">
                  No matches available today.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {sportGroups.map((group) => (
                  <Card key={group.name} sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }}>
                    <CardContent sx={{ p: 0 }}>
                      <Box 
                        onClick={() => toggleGroup(group.name)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 3,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getSportIcon(group.name)}
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            ml: 2
                          }}>
                            {getSportDisplayName(group.name)}
                          </Typography>
                          <Chip 
                            label={`${group.matches.length} match${group.matches.length !== 1 ? 'es' : ''}`}
                            size="small"
                            sx={{ 
                              ml: 2,
                              bgcolor: deepPurple[50],
                              color: deepPurple[800]
                            }} 
                          />
                        </Box>
                        {group.expanded ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                      
                      <Collapse in={group.expanded}>
                        <Divider />
                        <Box sx={{
                          display: 'grid',
                          gap: 2,
                          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
                          p: 3,
                          pt: 2
                        }}>
                          {group.matches.map((match, index) => (
                            <Card key={index} sx={{
                              borderRadius: 2,
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                              transition: 'transform 0.3s, box-shadow 0.3s',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                              }
                            }}>
                              <CardContent sx={{ p: 2 }}>
                                <Typography variant="subtitle1" sx={{ 
                                  fontWeight: 600,
                                  mb: 1
                                }}>
                                  {match.home_team}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: 'text.secondary',
                                  mb: 1,
                                  textAlign: 'center'
                                }}>
                                  vs
                                </Typography>
                                <Typography variant="subtitle1" sx={{ 
                                  fontWeight: 600,
                                  mb: 2
                                }}>
                                  {match.away_team}
                                </Typography>
                                
                                <Divider sx={{ my: 1 }} />
                                
                                <Box sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}>
                                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                    Odds:
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    {match.odds.map((odd, i) => (
                                      <Chip 
                                        key={i}
                                        label={odd}
                                        size="small"
                                        sx={{
                                          bgcolor: i === 0 ? deepPurple[100] : 
                                                  i === 1 ? '#e3f2fd' : '#f3e5f5',
                                          color: i === 0 ? deepPurple[800] : 
                                                i === 1 ? '#1976d2' : '#9c27b0',
                                          fontWeight: 600,
                                          minWidth: 42
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          ))}
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        <Box sx={{ 
          textAlign: 'center', 
          mt: 4,
          color: 'text.secondary',
          fontSize: '0.8rem'
        }}>
          © {new Date().getFullYear()} Odds Place Analytics. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;